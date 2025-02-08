// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RetryOptions } from "@azure/core-amqp";
import {
  retry,
  RetryOperationType,
  type ConnectionConfig,
  type RetryConfig,
} from "@azure/core-amqp";
import type { TokenCredential, NamedKeyCredential, SASCredential } from "@azure/core-auth";
import type { ServiceBusClientOptions } from "./constructorHelpers.js";
import {
  createConnectionContextForConnectionString,
  createConnectionContextForCredential,
} from "./constructorHelpers.js";
import { ConnectionContext } from "./connectionContext.js";
import type {
  ServiceBusReceiverOptions,
  ServiceBusSessionReceiverOptions,
  ReceiveMode,
  ServiceBusSenderOptions,
} from "./models.js";
import type { ServiceBusReceiver } from "./receivers/receiver.js";
import { ServiceBusReceiverImpl } from "./receivers/receiver.js";
import type { ServiceBusSessionReceiver } from "./receivers/sessionReceiver.js";
import { ServiceBusSessionReceiverImpl } from "./receivers/sessionReceiver.js";
import type { ServiceBusRuleManager } from "./serviceBusRuleManager.js";
import { ServiceBusRuleManagerImpl } from "./serviceBusRuleManager.js";
import type { ServiceBusSender } from "./sender.js";
import { ServiceBusSenderImpl } from "./sender.js";
import { entityPathMisMatchError } from "./util/errors.js";
import { MessageSession } from "./session/messageSession.js";
import { isDefined } from "@azure/core-util";
import { isCredential } from "./util/typeGuards.js";
import { ensureValidIdentifier } from "./util/utils.js";
import type { OperationOptions } from "@azure/core-client";
import type { PagedAsyncIterableIterator, PagedResult } from "@azure/core-paging";
import { getPagedAsyncIterator } from "@azure/core-paging";
import { tracingClient } from "./diagnostics/tracing.js";
import type { ListRequestOptions } from "./serviceBusAtomManagementClient.js";
import { logger } from "./log.js";

/**
 * A client that can create Sender instances for sending messages to queues and
 * topics as well as Receiver instances to receive messages from queues and subscriptions.
 */
export class ServiceBusClient {
  private _connectionContext: ConnectionContext;
  private _clientOptions: ServiceBusClientOptions;
  /**
   * The fully qualified namespace of the Service Bus instance for which this client is created.
   * This is likely to be similar to <yournamespace>.servicebus.windows.net.
   */
  public fullyQualifiedNamespace: string;
  /**
   * The name used to identify this ServiceBusClient.
   * If not specified or empty, a random unique one will be generated.
   */
  public identifier: string;
  /**
   * Creates an instance of the ServiceBusClient class which can be used to create senders and receivers to
   * the Azure Service Bus namespace provided in the connection string. No connection is made to the service
   * until the senders/receivers created with the client are used to send/receive messages.
   * @param connectionString - A connection string for Azure Service Bus namespace.
   * NOTE: this connection string can contain an EntityPath, which is ignored.
   * @param options - Options for the service bus client.
   */
  constructor(connectionString: string, options?: ServiceBusClientOptions);
  /**
   * Creates an instance of the ServiceBusClient class which can be used to create senders and receivers to
   * the Azure Service Bus namespace provided. No connection is made to the service until
   * the senders/receivers created with the client are used to send/receive messages.
   * @param fullyQualifiedNamespace - The full namespace of your Service Bus instance which is
   * likely to be similar to <yournamespace>.servicebus.windows.net.
   * @param credential - A credential object used by the client to get the token to authenticate the connection
   * with the Azure Service Bus. See &commat;azure/identity for creating the credentials.
   * If you're using an own implementation of the `TokenCredential` interface against AAD, then set the "scopes" for service-bus
   * to be `["https://servicebus.azure.net//user_impersonation"]` to get the appropriate token.
   * Use the `AzureNamedKeyCredential` from &commat;azure/core-auth if you want to pass in a `SharedAccessKeyName`
   * and `SharedAccessKey` without using a connection string. These fields map to the `name` and `key` field respectively
   * in `AzureNamedKeyCredential`.
   * Use the `AzureSASCredential` from &commat;azure/core-auth if you want to pass in a `SharedAccessSignature`
   * without using a connection string. This field maps to `signature` in `AzureSASCredential`.
   * @param options - A set of options to apply when configuring the client.
   * - `retryOptions`   : Configures the retry policy for all the operations on the client.
   * For example, `{ "maxRetries": 4 }` or `{ "maxRetries": 4, "retryDelayInMs": 30000 }`.
   * - `webSocketOptions`: Configures the channelling of the AMQP connection over Web Sockets.
   */
  constructor(
    fullyQualifiedNamespace: string,
    credential: TokenCredential | NamedKeyCredential | SASCredential,
    options?: ServiceBusClientOptions,
  );
  constructor(
    fullyQualifiedNamespaceOrConnectionString1: string,
    credentialOrOptions2?:
      | TokenCredential
      | NamedKeyCredential
      | SASCredential
      | ServiceBusClientOptions,
    options3?: ServiceBusClientOptions,
  ) {
    if (isCredential(credentialOrOptions2)) {
      const fullyQualifiedNamespace: string = fullyQualifiedNamespaceOrConnectionString1;
      const credential = credentialOrOptions2;
      this._clientOptions = options3 || {};

      this._connectionContext = createConnectionContextForCredential(
        credential,
        fullyQualifiedNamespace,
        this._clientOptions,
      );
    } else {
      const connectionString: string = fullyQualifiedNamespaceOrConnectionString1;
      this._clientOptions = credentialOrOptions2 || {};

      this._connectionContext = createConnectionContextForConnectionString(
        connectionString,
        this._clientOptions,
      );
    }
    this.fullyQualifiedNamespace = this._connectionContext.config.host;
    this.identifier = ensureValidIdentifier(
      this.fullyQualifiedNamespace,
      this._clientOptions.identifier,
    );
    this._clientOptions.retryOptions = this._clientOptions.retryOptions || {};

    const timeoutInMs = this._clientOptions.retryOptions.timeoutInMs;
    if (
      isDefined(timeoutInMs) &&
      (typeof timeoutInMs !== "number" || !isFinite(timeoutInMs) || timeoutInMs <= 0)
    ) {
      throw new Error(`${timeoutInMs} is an invalid value for retryOptions.timeoutInMs`);
    }
  }

  /**
   * Creates a receiver for an Azure Service Bus queue. No connection is made
   * to the service until one of the methods on the receiver is called.
   *
   * To target sub queues like the dead letter queue or the transfer dead letter queue, provide the
   * `subQueue` in the options. To learn more about dead letter queues, see
   * https://learn.microsoft.com/azure/service-bus-messaging/service-bus-dead-letter-queues
   *
   * You can choose between two receive modes:  "peekLock" (default) and "receiveAndDelete".
   * - In peekLock mode, the receiver has a lock on the message for the duration specified on the
   * queue.
   * - In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
   *
   * Messages that are not settled within the lock duration will be redelivered as many times as
   * the max delivery count set on the queue, after which they get sent to a separate dead letter
   * queue.
   *
   * You can settle a message by calling completeMessage(), abandonMessage(), deferMessage() or
   * deadletterMessage() methods on the receiver.
   *
   * More information about how peekLock and message settlement works here:
   * https://learn.microsoft.com/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
   *
   * @param queueName - The name of the queue to receive from.
   * @param options - Options to pass the receiveMode, defaulted to peekLock.
   * @returns A receiver that can be used to receive, peek and settle messages.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  createReceiver(queueName: string, options?: ServiceBusReceiverOptions): ServiceBusReceiver;
  /**
   * Creates a receiver for an Azure Service Bus subscription. No connection is made
   * to the service until one of the methods on the receiver is called.
   *
   * To target sub queues like the dead letter queue or the transfer dead letter queue, provide the
   * `subQueue` in the options. To learn more about dead letter queues, see
   * https://learn.microsoft.com/azure/service-bus-messaging/service-bus-dead-letter-queues
   *
   * You can choose between two receive modes:  "peekLock" (default) and "receiveAndDelete".
   * - In peekLock mode, the receiver has a lock on the message for the duration specified on the
   * queue.
   * - In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
   *
   * Messages that are not settled within the lock duration will be redelivered as many times as
   * the max delivery count set on the subscription, after which they get sent to a separate dead letter
   * queue.
   *
   * You can settle a message by calling completeMessage(), abandonMessage(), deferMessage() or
   * deadletterMessage() methods on the receiver.
   *
   * More information about how peekLock and message settlement works here:
   * https://learn.microsoft.com/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
   *
   * @param topicName - Name of the topic for the subscription we want to receive from.
   * @param subscriptionName - Name of the subscription (under the `topic`) that we want to receive from.
   * @param options - Options to pass the receiveMode, defaulted to peekLock.
   * @returns A receiver that can be used to receive, peek and settle messages.
   */
  createReceiver(
    topicName: string,
    subscriptionName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: ServiceBusReceiverOptions,
  ): ServiceBusReceiver;
  createReceiver(
    queueOrTopicName1: string,
    optionsOrSubscriptionName2?: ServiceBusReceiverOptions | string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options3?: ServiceBusReceiverOptions,
  ): ServiceBusReceiver {
    validateEntityPath(this._connectionContext.config, queueOrTopicName1);

    // NOTE: we don't currently have any options for this kind of receiver but
    // when we do make sure you pass them in and extract them.
    const { entityPath, receiveMode, options } = extractReceiverArguments(
      queueOrTopicName1,
      optionsOrSubscriptionName2,
      options3,
    );

    let entityPathWithSubQueue = entityPath;
    if (options?.subQueueType) {
      switch (options?.subQueueType) {
        case "deadLetter":
          entityPathWithSubQueue += "/$DeadLetterQueue";
          break;
        case "transferDeadLetter":
          entityPathWithSubQueue += "/$Transfer/$DeadLetterQueue";
          break;
        default:
          throw new Error(
            `Invalid subQueueType '${options?.subQueueType}' provided. Valid values are 'deadLetter' and 'transferDeadLetter'`,
          );
      }
    }

    const maxLockAutoRenewDurationInMs =
      options?.maxAutoLockRenewalDurationInMs != null
        ? options.maxAutoLockRenewalDurationInMs
        : 5 * 60 * 1000;

    return new ServiceBusReceiverImpl(
      this._connectionContext,
      entityPathWithSubQueue,
      receiveMode,
      maxLockAutoRenewDurationInMs,
      options?.skipParsingBodyAsJson ?? false,
      options?.skipConvertingDate ?? false,
      this._clientOptions.retryOptions,
      options?.identifier,
    );
  }

  /**
   * Creates an instance of {@link ServiceBusRuleManager} that is used to manage
   * the rules for a subscription.
   *
   * @param topicName - the topic to create {@link ServiceBusRuleManager}
   * @param subscriptionName - the subscription specific to the specified topic to create a {@link ServiceBusRuleManager} for.
   * @returns a {@link ServiceBusRuleManager} scoped to the specified subscription and topic.
   */
  createRuleManager(topicName: string, subscriptionName: string): ServiceBusRuleManager {
    validateEntityPath(this._connectionContext.config, topicName);

    const { entityPath } = extractReceiverArguments(topicName, subscriptionName);
    return new ServiceBusRuleManagerImpl(
      this._connectionContext,
      entityPath,
      this._clientOptions.retryOptions,
    );
  }

  /**
   * Creates a receiver for a session enabled Azure Service Bus queue.
   *
   * You can choose between two receive modes:  "peekLock" (default) and "receiveAndDelete".
   * - In peekLock mode, the receiver has a lock on the message for the duration specified on the
   * queue.
   * - In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
   *
   * You can settle a message by calling completeMessage(), abandonMessage(), deferMessage() or
   * deadletterMessage() methods on the receiver.
   *
   * More information about how peekLock and message settlement works here:
   * https://learn.microsoft.com/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
   *
   * @param queueName - The name of the queue to receive from.
   * @param sessionId - The id of the session from which messages need to be received
   * @param options - Options include receiveMode(defaulted to peekLock), options to create session receiver.
   * @returns A receiver that can be used to receive, peek and settle messages.
   */
  acceptSession(
    queueName: string,
    sessionId: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: ServiceBusSessionReceiverOptions,
  ): Promise<ServiceBusSessionReceiver>;
  /**
   * Creates a receiver for a session enabled Azure Service Bus subscription.
   *
   * You can choose between two receive modes:  "peekLock" (default) and "receiveAndDelete".
   * - In peekLock mode, the receiver has a lock on the message for the duration specified on the
   * queue.
   * - In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
   *
   * You can settle a message by calling completeMessage(), abandonMessage(), deferMessage() or
   * deadletterMessage() methods on the receiver.
   *
   * More information about how peekLock and message settlement works here:
   * https://learn.microsoft.com/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
   *
   * @param topicName - Name of the topic for the subscription we want to receive from.
   * @param subscriptionName - Name of the subscription (under the `topic`) that we want to receive from.
   * @param sessionId - The id of the session from which messages need to be received
   * @param options - Options include receiveMode(defaulted to peekLock), options to create session receiver.
   * @returns A receiver that can be used to receive, peek and settle messages.
   */
  acceptSession(
    topicName: string,
    subscriptionName: string,
    sessionId: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: ServiceBusSessionReceiverOptions,
  ): Promise<ServiceBusSessionReceiver>;
  async acceptSession(
    queueOrTopicName1: string,
    optionsOrSubscriptionNameOrSessionId2?: ServiceBusSessionReceiverOptions | string,
    optionsOrSessionId3?: ServiceBusSessionReceiverOptions | string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options4?: ServiceBusSessionReceiverOptions,
  ): Promise<ServiceBusSessionReceiver> {
    validateEntityPath(this._connectionContext.config, queueOrTopicName1);

    let sessionId: string;
    let entityPath: string;
    let receiveMode: "peekLock" | "receiveAndDelete";
    let options: ServiceBusSessionReceiverOptions | undefined;

    if (
      typeof queueOrTopicName1 === "string" &&
      typeof optionsOrSubscriptionNameOrSessionId2 === "string" &&
      typeof optionsOrSessionId3 === "string"
    ) {
      // subscription constructor
      sessionId = optionsOrSessionId3;

      ({ entityPath, receiveMode, options } = extractReceiverArguments(
        queueOrTopicName1,
        optionsOrSubscriptionNameOrSessionId2,
        // skip the session ID parameter (3)
        options4,
      ));
    } else if (
      typeof queueOrTopicName1 === "string" &&
      typeof optionsOrSubscriptionNameOrSessionId2 === "string" &&
      typeof optionsOrSessionId3 !== "string"
    ) {
      // queue constructor (but only because we know we're not a subscription constructor)
      sessionId = optionsOrSubscriptionNameOrSessionId2;

      ({ entityPath, receiveMode, options } = extractReceiverArguments(
        queueOrTopicName1,
        // skip the session ID parameter (2)
        optionsOrSessionId3,
        undefined,
      ));
    } else {
      throw new Error("Unhandled set of parameters");
    }

    const messageSession = await MessageSession.create(
      ensureValidIdentifier(entityPath, options?.identifier),
      this._connectionContext,
      entityPath,
      sessionId,
      {
        maxAutoLockRenewalDurationInMs: options?.maxAutoLockRenewalDurationInMs,
        receiveMode,
        abortSignal: options?.abortSignal,
        retryOptions: this._clientOptions.retryOptions,
        skipParsingBodyAsJson: options?.skipParsingBodyAsJson ?? false,
        skipConvertingDate: options?.skipConvertingDate ?? false,
      },
    );

    const sessionReceiver = new ServiceBusSessionReceiverImpl(
      messageSession,
      this._connectionContext,
      entityPath,
      receiveMode,
      options?.skipParsingBodyAsJson ?? false,
      options?.skipConvertingDate ?? false,
      this._clientOptions.retryOptions,
    );

    return sessionReceiver;
  }

  /**
   * Creates a receiver for the next available session in a session-enabled Azure Service Bus queue.
   *
   * You can choose between two receive modes:  "peekLock" (default) and "receiveAndDelete".
   * - In peekLock mode, the receiver has a lock on the message for the duration specified on the
   * queue.
   * - In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
   *
   * You can settle a message by calling completeMessage(), abandonMessage(), deferMessage() or
   * deadletterMessage() methods on the receiver.
   *
   * More information about how peekLock and message settlement works here:
   * https://learn.microsoft.com/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
   *
   * @param queueName - The name of the queue to receive from.
   * @param options - Options include receiveMode(defaulted to peekLock), options to create session receiver.
   * @returns A receiver that can be used to receive, peek and settle messages.
   */
  acceptNextSession(
    queueName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: ServiceBusSessionReceiverOptions,
  ): Promise<ServiceBusSessionReceiver>;
  /**
   * Creates a receiver for the next available session in a session-enabled Azure Service Bus subscription.
   *
   * You can choose between two receive modes:  "peekLock" (default) and "receiveAndDelete".
   * - In peekLock mode, the receiver has a lock on the message for the duration specified on the
   * queue.
   * - In receiveAndDelete mode, messages are deleted from Service Bus as they are received.
   *
   * You can settle a message by calling completeMessage(), abandonMessage(), deferMessage() or
   * deadletterMessage() methods on the receiver.
   *
   * More information about how peekLock and message settlement works here:
   * https://learn.microsoft.com/azure/service-bus-messaging/message-transfers-locks-settlement#peeklock
   *
   * @param topicName - Name of the topic for the subscription we want to receive from.
   * @param subscriptionName - Name of the subscription (under the `topic`) that we want to receive from.
   * @param options - Options include receiveMode(defaulted to peekLock), options to create session receiver.
   * @returns A receiver that can be used to receive, peek and settle messages.
   */
  acceptNextSession(
    topicName: string,
    subscriptionName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: ServiceBusSessionReceiverOptions,
  ): Promise<ServiceBusSessionReceiver>;
  async acceptNextSession(
    queueOrTopicName1: string,
    optionsOrSubscriptionName2?: ServiceBusSessionReceiverOptions | string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options3?: ServiceBusSessionReceiverOptions,
  ): Promise<ServiceBusSessionReceiver> {
    validateEntityPath(this._connectionContext.config, queueOrTopicName1);

    const { entityPath, receiveMode, options } = extractReceiverArguments(
      queueOrTopicName1,
      optionsOrSubscriptionName2,
      options3,
    );

    const messageSession = await MessageSession.create(
      ensureValidIdentifier(entityPath, options?.identifier),
      this._connectionContext,
      entityPath,
      undefined,
      {
        maxAutoLockRenewalDurationInMs: options?.maxAutoLockRenewalDurationInMs,
        receiveMode,
        abortSignal: options?.abortSignal,
        retryOptions: this._clientOptions.retryOptions,
        skipParsingBodyAsJson: options?.skipParsingBodyAsJson ?? false,
        skipConvertingDate: options?.skipConvertingDate ?? false,
      },
    );

    const sessionReceiver = new ServiceBusSessionReceiverImpl(
      messageSession,
      this._connectionContext,
      entityPath,
      receiveMode,
      options?.skipParsingBodyAsJson ?? false,
      options?.skipConvertingDate ?? false,
      this._clientOptions.retryOptions,
    );

    return sessionReceiver;
  }

  /**
   * Returns an async iterable iterator to list all the sessions in a messaging entity.
   * More information about how peekLock and message settlement works here:
   * https://learn.microsoft.com/azure/service-bus-messaging/service-bus-amqp-request-response#response-8
   *
   * .byPage() returns an async iterable iterator to list the session id's in pages.
   *
   * @param queueName - The name of the queue to receive from.
   * @param options - Options include receiveMode(defaulted to peekLock), options to create session receiver.
   * @returns An asyncIterableIterator that supports paging.
   */
  listSessions(queueName: string, options?: OperationOptions): PagedAsyncIterableIterator<string>;
  /**
   * Returns an async iterable iterator to list all the sessions in a messaging entity.
   * More information about how peekLock and message settlement works here:
   * https://learn.microsoft.com/azure/service-bus-messaging/service-bus-amqp-request-response#response-8
   *
   * .byPage() returns an async iterable iterator to list the session id's in pages.
   *
   * @param topicName - Name of the topic for the subscription we want to receive from.
   * @param subscriptionName - Name of the subscription (under the `topic`) that we want to receive from.
   * @param options - Options include receiveMode(defaulted to peekLock), options to create session receiver.
   * @returns An asyncIterableIterator that supports paging.
   */
  listSessions(
    topicName: string,
    subscriptionName: string,
    options?: OperationOptions,
  ): PagedAsyncIterableIterator<string>;
  listSessions(
    queueOrTopicName1: string,
    optionsOrSubscriptionName2?: ServiceBusSessionReceiverOptions | string,
    options3?: OperationOptions,
  ): PagedAsyncIterableIterator<string> {
    validateEntityPath(this._connectionContext.config, queueOrTopicName1);

    const { entityPath, options } = extractReceiverArguments(
      queueOrTopicName1,
      optionsOrSubscriptionName2,
      options3,
    );

    logger.verbose(`Performing operation - listSessions() with options: %j`, options);
    const pagedResult: PagedResult<string[], { maxPageSize?: number }, number> = {
      firstPageLink: 0,
      getPage: async (pageLink, maxPageSize) => {
        const top = maxPageSize ?? 100;
        const { skip: lastSkip, "sessions-ids": sessions } = await getSessions(
          this._connectionContext,
          entityPath,
          this._clientOptions.retryOptions ?? {},
          {
            skip: pageLink,
            maxCount: top,
            ...options,
          },
        );
        return sessions.length
          ? {
              page: sessions,
              nextPageLink: lastSkip,
            }
          : undefined;
      },
    };

    return getPagedAsyncIterator(pagedResult);
  }

  /**
   * Creates a Sender which can be used to send messages, schedule messages to be
   * sent at a later time and cancel such scheduled messages. No connection is made
   * to the service until one of the methods on the sender is called.
   * @param queueOrTopicName - The name of a queue or topic to send messages to.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  createSender(queueOrTopicName: string, options: ServiceBusSenderOptions = {}): ServiceBusSender {
    validateEntityPath(this._connectionContext.config, queueOrTopicName);

    return new ServiceBusSenderImpl(
      this._connectionContext,
      queueOrTopicName,
      this._clientOptions.retryOptions,
      options.identifier,
    );
  }

  /**
   * Closes the underlying AMQP connection.
   * NOTE: this will also disconnect any Receiver or Sender instances created from this
   * instance.
   */
  close(): Promise<void> {
    return ConnectionContext.close(this._connectionContext);
  }
}

/**
 * Helper to validate and extract the common arguments from both the create*Receiver() overloads that
 * have this pattern:
 *
 * queue, options
 * topic, subscription, options
 *
 * @internal
 */
export function extractReceiverArguments<OptionsT extends { receiveMode?: ReceiveMode }>(
  queueOrTopicName1: string,
  optionsOrSubscriptionName2: string | OptionsT | undefined,
  definitelyOptions3?: OptionsT,
): {
  entityPath: string;
  receiveMode: ReceiveMode;
  options?: Omit<OptionsT, "receiveMode">;
} {
  let entityPath: string;
  let options: OptionsT | undefined;
  if (typeof optionsOrSubscriptionName2 === "string") {
    const topic = queueOrTopicName1;
    const subscription = optionsOrSubscriptionName2;
    entityPath = `${topic}/Subscriptions/${subscription}`;
    options = definitelyOptions3;
  } else {
    entityPath = queueOrTopicName1;
    options = optionsOrSubscriptionName2;
  }
  let receiveMode: ReceiveMode;
  if (!options || !isDefined(options.receiveMode) || options.receiveMode === "peekLock") {
    receiveMode = "peekLock";
  } else if (options.receiveMode === "receiveAndDelete") {
    receiveMode = "receiveAndDelete";
  } else {
    throw new TypeError(
      `Invalid receiveMode '${options?.receiveMode}' provided. Valid values are 'peekLock' and 'receiveAndDelete'`,
    );
  }
  delete options?.receiveMode;
  return {
    entityPath,
    receiveMode,
    options,
  };
}

/**
 * Validates that the EntityPath in the connection string (if any) matches with the
 * queue or topic name passed to the methods that create senders and receivers.
 *
 * @internal
 */
function validateEntityPath(connectionConfig: ConnectionConfig, queueOrTopicName: string): void {
  if (connectionConfig.entityPath && connectionConfig.entityPath !== queueOrTopicName) {
    throw new Error(entityPathMisMatchError);
  }
}

/**
 * @internal
 *
 * Get all sessions associated with an entity.
 */
export async function getSessions(
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  context: ConnectionContext,
  entityPath: string,
  retryOptions: RetryOptions,
  options?: ListRequestOptions & OperationOptions,
): Promise<{ skip?: number; "sessions-ids": string[] }> {
  return tracingClient.withSpan(
    "ServiceBusClient.getSessions",
    options ?? {},
    async (updatedOptions) => {
      const operationPromise = async (): Promise<{ skip?: number; "sessions-ids": string[] }> => {
        return context.getManagementClient(entityPath).getSessions({
          ...updatedOptions,
          requestName: "getSessions",
          timeoutInMs: retryOptions.timeoutInMs,
        });
      };
      const config: RetryConfig<{ skip?: number; "sessions-ids": string[] }> = {
        operation: operationPromise,
        connectionId: context.connectionId,
        operationType: RetryOperationType.management,
        retryOptions: retryOptions,
        abortSignal: updatedOptions?.abortSignal,
      };
      return retry<{ skip?: number; "sessions-ids": string[] }>(config);
    },
  );
}
