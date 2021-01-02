import { NamingSubtest, GenericSubtest } from './LASTDataFormat';

type SubtestResult = {
  passed: boolean;
  secondsElapsed: number | null;
  subtest: GenericSubtest | NamingSubtest;
}

type TestResults = {
  [key: string]: SubtestResult[]; // the key of the key-value pair is the name of a subtest category
}

export type { SubtestResult, TestResults };
