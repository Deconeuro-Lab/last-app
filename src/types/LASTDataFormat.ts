// types of subtests:

type GenericSubtest = string;

type NamingSubtest = {
  item: string;
  jpg: string;
  acceptableResponses: string[];
  incorrectResponses: string[];
}

// grouping subtests into entire tests:

interface EntireTest {
  [key: string]: NamingSubtest[] | GenericSubtest[];
  naming: NamingSubtest[];
  repetition: GenericSubtest[];
  autoseq: GenericSubtest[];
  picID: GenericSubtest[];
  verbal: GenericSubtest[];
}

interface LASTTestsDataFormat {
  // version A and B
  A: EntireTest;
  B: EntireTest;
  categoriesInOrder: string[];
}

export type { LASTTestsDataFormat, EntireTest, GenericSubtest, NamingSubtest };
