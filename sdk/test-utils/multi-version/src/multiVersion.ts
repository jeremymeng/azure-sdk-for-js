// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as Mocha from "mocha";

import { isLiveMode } from "@azure/test-utils-recorder";
import { getGlobalObject } from "./global";

export interface TestFunctionWrapper {
  it:
    | Mocha.TestFunction
    | (Mocha.PendingTestFunction & {
        only: Mocha.ExclusiveTestFunction;
      });
  xit: Mocha.PendingTestFunction;
  describe:
    | Mocha.SuiteFunction
    | (Mocha.PendingSuiteFunction & {
        only: Mocha.ExclusiveSuiteFunction;
      });
  xdescribe: Mocha.PendingSuiteFunction;
  //global: NodeJS.Global;
}

/**
 * Specifies service versions that a test/test suite supports. This can be a list of
 * version strings, or a range of versions denoted by minVer/maxVer.
 */
export type SupportedVersions =
  | string[]
  | {
      minVer?: string;
      maxVer?: string;
    };

function skipReason(currentVersion: string, supported: SupportedVersions): string {
  if (supported instanceof Array) {
    return `Skipping for version ${currentVersion} as it's not in the list [${supported.join()}]`;
  } else {
    return `Skipping for version ${currentVersion} as it's not in the range: [min ${supported.minVer ??
      "<unspecified>"}, max ${supported.maxVer ?? "<unspecified>"}]`;
  }
}

/**
 *
 * @param currentVersion current service version to run test with
 * @param supported service versions supported by a test suite or test case
 * @param allVersions all service versions supported by the SDK library being tested.
 *                    NOTE: The versions must be in order from oldest to latest.
 */
export function isVersionInSupportedRange(
  currentVersion: string,
  supported: SupportedVersions,
  allVersions: string[]
): { isSupported: boolean; skipReason?: string } {
  const lessThanOrEqual = function(a: string, b: string) {
    const idxA = allVersions.indexOf(a);
    const idxB = allVersions.indexOf(b);
    if (idxA === -1) {
      throw new Error(`version '${a}' is not in versions supported by the SDK`);
    }
    if (idxB === -1) {
      throw new Error(`version '${b}' is not in versions supported by the SDK`);
    }
    return idxA <= idxB;
  };

  let run: boolean;
  if (supported instanceof Array) {
    console.log(`Test ${currentVersion} for supported versions [${supported.join()}]?`);

    run = supported.includes(currentVersion);

    if (run) {
      console.log(`  Running test on ${currentVersion}`);
      return { isSupported: true };
    } else {
      console.log(`  Skipping test on ${currentVersion}`);
      return {
        isSupported: false,
        skipReason: skipReason(currentVersion, supported)
      };
    }
  } else {
    console.log(
      `Test ${currentVersion} for supported version range: [min ${supported.minVer} max ${supported.maxVer}]`
    );
    if (supported.minVer && supported.maxVer) {
      if (
        lessThanOrEqual(supported.minVer, currentVersion) &&
        lessThanOrEqual(currentVersion, supported.maxVer)
      ) {
        console.log(`  Test ${currentVersion} because it is within range`);
        return { isSupported: true };
      } else {
        console.log(`  Skipping ${currentVersion} because it is out of range`);
        return {
          isSupported: false,
          skipReason: skipReason(currentVersion, supported)
        };
      }
    } else if (supported.minVer) {
      if (lessThanOrEqual(supported.minVer, currentVersion)) {
        console.log(`  Test ${currentVersion} because it is above minVer`);
        return { isSupported: true };
      } else {
        console.log(`  Skip ${currentVersion} because it is below minVer`);
        return {
          isSupported: false,
          skipReason: skipReason(currentVersion, supported)
        };
      }
    } else if (supported.maxVer) {
      if (lessThanOrEqual(currentVersion, supported.maxVer)) {
        console.log(`  Test ${currentVersion} because it's below maxVer`);
        return { isSupported: true };
      } else {
        console.log(`  Skip ${currentVersion} because it's above maxVer`);
        return {
          isSupported: false,
          skipReason: skipReason(currentVersion, supported)
        };
      }
    } else {
      throw new Error(
        "Must use either minVer, or maxVer, or both to specify supported version range."
      );
    }
  }
}

/**
 * Returns a Mocha wrapper that runs or skips a test/test suite for currentVersion, given a list
 * of versions or a range of versions supported by the test/test suite.
 * @param currentVersion version to check wether to run or skip
 * @param supported supported versions for a test/test suite
 * @param allVersions all service versions supported by the SDK library being tested.
 *                    NOTE: The versions must be in order from oldest to latest.
 */
export function supports(
  currentVersion: string,
  supported: SupportedVersions,
  allVersions: string[]
): TestFunctionWrapper {
  const run = isVersionInSupportedRange(currentVersion, supported, allVersions);
  const either = function(keep: any, skip: any) {
    return run.isSupported
      ? keep
      : isLiveMode()
      ? // only append skip reason to titles in live TEST_MODE.
        // Record and playback depends on titles for recording file names so keeping them
        // in order to be compatible with existing recordings.
        function(title: string, fn: Mocha.Func | Mocha.AsyncFunc) {
          return skip(`${title} (${run.skipReason})`, fn);
        }
      : skip;
  };

  const it = either(supports.global.it, supports.global.xit);
  Object.defineProperty(it, "only", {
    value: either(supports.global.it.only, supports.global.xit)
  });

  // add current service version to suite titles in Live TEST_MODE
  // Record and playback depends on titles for recording file names so keeping them
  // in order to be compatible with existing recordings.
  const wrappedDescribe = isLiveMode()
    ? function(title: string, fn: Mocha.Func | Mocha.AsyncFunc) {
        return supports.global.describe(`${title} (service version ${currentVersion})`, fn);
      }
    : supports.global.describe;
  const wrappedDescribeOnly = isLiveMode()
    ? function(title: string, fn: Mocha.Func | Mocha.AsyncFunc) {
        return supports.global.describe.only(`${title} (service version ${currentVersion})`, fn);
      }
    : supports.global.describe.only;

  const describe = either(wrappedDescribe, supports.global.xdescribe);
  Object.defineProperty(describe, "only", {
    value: either(wrappedDescribeOnly, supports.global.xdescribe)
  });

  const chain: TestFunctionWrapper = {
    //global: getGlobalObject(),
    it,
    xit: supports.global.xit,
    describe,
    xdescribe: supports.global.xdescribe
  };

  return chain;
}

supports.global = getGlobalObject();

/**
 * Options to multi-service-version tests
 */
export interface MultiVersionTestOptions {
  /**
   * version to used for record/playback
   */
  versionForRecording?: string;
}

/**
 * Determines the set of service versions used to run tests based on TEST_MODE
 * - For live tests loop through all the versions and run tests for each version.
 * - For record and playback, use the defaultVersion in options if specified, otherwise use the latest version.
 * @param versions list of service versions to run the tests
 *                 NOTE: The versions must be in order from oldest to latest.
 * @param options Optional settings such as version to use for record/playback, and
 *                custom string comparison function to determines order of version strings.
 */
export function versionsToTest(
  versions: string[],
  options: MultiVersionTestOptions = {}
): string[] {
  if (versions.length <= 0) {
    throw new Error("invalid list of service versions to run the tests.");
  }

  // all versions are used in live TEST_MODE
  if (isLiveMode()) {
    return versions;
  }

  return options.versionForRecording
    ? [options.versionForRecording]
    : versions.slice(versions.length - 1);
}

export function testServiceVersions(versions: string[], options: MultiVersionTestOptions = {}) {
  const toTest: string[] = isLiveMode()
    ? versions
    : options.versionForRecording
    ? [options.versionForRecording]
    : versions.slice(versions.length - 1);

  // @ts-ignore skip and only are defined below
  const loopingDescribe: Mocha.SuiteFunction = function(
    title: string,
    fn: (this: Mocha.Suite) => void
  ) {
    if (isLiveMode()) {
      for (const v of toTest) {
        const newFn = function(this: Mocha.Suite) {
          this.ctx.allVersions = versions;
          this.ctx.currentVersion = v;
          // @ts-ignore
          fn(this);
        };

        testServiceVersions.global.describe(`${title} - (service version '${v}')`, newFn);
      }
    } else {
      const newFn = function(this: Mocha.Suite) {
        this.ctx.allVersions = versions;
        this.ctx.currentVersion = toTest[0];
        // @ts-ignore
        fn(this);
      };

      testServiceVersions.global.describe(title, newFn);
    }
  };
  Object.defineProperty(loopingDescribe, "only", {
    value: testServiceVersions.global.describe.only
  });
  Object.defineProperty(loopingDescribe, "skip", {
    value: testServiceVersions.global.describe.skip
  });
  return {
    describe: loopingDescribe
  };
}
testServiceVersions.global = getGlobalObject();

function getPropertyFromMocha(name: string, context: Mocha.Suite | Mocha.Context) {
  let pointer: Mocha.Context | Mocha.Suite | Mocha.Test | undefined = context;
  while (pointer) {
    if (pointer instanceof Mocha.Context) {
      if (pointer[name]) {
        return pointer[name];
      }
      pointer = pointer.test?.parent;
    } else {
      if (pointer.ctx[name]) {
        return pointer.ctx[name];
      }
      pointer = pointer.parent;
    }
  }

  return undefined;
}

export function getCurrentVersion(context: Mocha.Context | Mocha.Suite) {
  return getPropertyFromMocha("currentVersion", context);
}

export function getAllVersions(context: Mocha.Context | Mocha.Suite) {
  return getPropertyFromMocha("allVersions", context);
}

export function onVersions(
  supported: SupportedVersions
): {
  it: Mocha.TestFunction;
} {
  if (!isLiveMode()) {
    return {
      it: onVersions.global.it
    };
  }

  // @ts-ignore only, skip, and retries are defined below
  const wrappedIt: Mocha.TestFunction = function(title: string, fn: Mocha.Func | Mocha.AsyncFunc) {
    const newFn = function(this: Mocha.Context) {
      const currentVersion = getCurrentVersion(this);
      const allVersions = getAllVersions(this);
      if (isVersionInSupportedRange(currentVersion, supported, allVersions).isSupported) {
        // @ts-ignore
        fn(this);
      } else {
        if (this.test) {
          this.test.pending = true;
        }
        // @ts-ignore
        fn(this);
      }
    };
    return onVersions.global.it(title, newFn);
  };

  const wrappedItOnly = function(title: string, fn: Mocha.Func | Mocha.AsyncFunc): Mocha.Test {
    const newFn = function(this: Mocha.Context) {
      const currentVersion = getCurrentVersion(this);
      const allVersions = getAllVersions(this);
      if (isVersionInSupportedRange(currentVersion, supported, allVersions).isSupported) {
        // @ts-ignore
        fn(this);
      } else {
        if (this.test) {
          this.test.pending = true;
        }
        // @ts-ignore
        fn(this);
      }
    };
    return onVersions.global.it.only(title, newFn);
  };

  Object.defineProperty(wrappedIt, "only", {
    value: wrappedItOnly
  });

  Object.defineProperty(wrappedIt, "skip", {
    value: testServiceVersions.global.it.skip
  });

  Object.defineProperty(wrappedIt, "retries", {
    value: testServiceVersions.global.it.retries
  });

  return {
    it: wrappedIt
  };
}

onVersions.global = getGlobalObject();
