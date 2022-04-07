/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.

  This sample demonstrates how to create a React hook integrating
  with Azure Service Bus.

  For more information on Azure Service Bus please see
  https://www.npmjs.com/package/@azure/service-bus
*/

import { useEffect, useRef } from "react";
import {
  MessageHandlers,
  ServiceBusClient,
  ServiceBusMessage,
  ServiceBusReceiver,
  ServiceBusSender,
} from "@azure/service-bus";
import { credential, getEnvironmentVariable } from "../utils";

type Hook = (
  callBack: (message: ServiceBusMessage) => Promise<void>
) => (message: ServiceBusMessage) => Promise<void>;

/**
 * The ServiceBus hook accepts a callback function and returns a function
 * that allows you to publish message to ServiceBus.
 * @param callback The function to be called for every ServiceBus message
 */
const useServiceBus: Hook = (callback) => {
  // Keep a reference on our ServiceBus client, sender, and receiver
  // in order to lazy-load them as needed.
  const client = useRef<ServiceBusClient>();
  const receiver = useRef<ServiceBusReceiver>();
  const sender = useRef<ServiceBusSender>();

  /**
   * Send a message to a ServiceBus instance using the
   * settings defined in environment variables.
   * @param message The message to send to ServiceBus.
   */
  const sendMessage = async(message: ServiceBusMessage) => {
    if (!sender.current) {
      throw new Error("[ServiceBus]: Sender never initialized!");
    }
    console.log("[ServiceBus]: Sending message", message);
    await sender.current.sendMessages([message]);
  };

  // Define various handlers for processing messages and errors
  // For simplicity we just pass each message to the consumer
  // client of this hook.
  const messageHandlers: MessageHandlers = {
    processMessage: async (brokeredMessage) => {
      console.log("[ServiceBus]: Received Message", brokeredMessage.body);
      await callback(brokeredMessage);
    },
    processError: async (err) => {
      console.log("[ServiceBus]: Received Error", err);
    }
  };

  useEffect(() => {
    const namespace = getEnvironmentVariable("REACT_APP_SERVICE_BUS_NAMESPACE");
    const queueName = getEnvironmentVariable("REACT_APP_SERVICE_BUS_QUEUE_NAME");

    if (!client.current) {
      client.current = new ServiceBusClient(namespace, credential);
    }

    if (!receiver.current) {
      receiver.current = client.current.createReceiver(queueName);

      receiver.current.subscribe(messageHandlers);
    }

    if (!sender.current) {
      sender.current = client.current.createSender(queueName);
    }

    // Close the connections to ServiceBus when this hook is
    // cleaned up.
    return () => {
      sender.current?.close();
      receiver.current?.close();
      client.current?.close();
    };
  }, []);

  return sendMessage;
};

export { useServiceBus };
