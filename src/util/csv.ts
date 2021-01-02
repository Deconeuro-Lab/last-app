import { TestResults } from '../types/LASTResultsFormat';

const flattenTestResultsToArray = (results: TestResults, testCategories: string[]) => {
  const mapFullCategoryName: { [key: string]: string } = {
    naming: 'Naming',
    repetition: 'Repetition',
    autoseq: 'Automatic Sequence',
    picID: 'Picture Identification',
    verbal: 'Verbal Commands'
  };

  const arr = [];

  for (const cat of testCategories) {
    for (const result of results[cat]) {
      const newObj = { ...result, test: mapFullCategoryName[cat], 'passed?': result.passed ? 'yes' : 'no' };

      if (cat === 'naming') {
        // @ts-ignore
        arr.push({ ...newObj, subtest: result.subtest.item });
      } else {
        arr.push({ ...newObj });
      }
    }
  }

  return arr;
};

const arrayOfObjectsTOCSV = (arr: { [key: string]: any }[]) => {
  const csvRows = [];

  // get csv headers
  // const headers = Object.keys(arr[0]);
  const headers = [ 'test', 'subtest', 'secondsElapsed', 'passed?' ];
  csvRows.push(headers.join(','));

  // loop and generate rows
  for (const row of arr) {
    const values = headers.map((header) => {
      const value = row[header] || 'N/A';
      const escaped = ('' + value).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
};

const download = (data: string, type: string, fileName: string) => {
  const blob = new Blob([ data ], { type });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', `${fileName}.csv`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const exportReport = (testResults: TestResults, testCategories: string[], testVersion: 'A' | 'B') => {
  const data = flattenTestResultsToArray(testResults, testCategories);
  const csv = arrayOfObjectsTOCSV(data);

  console.log(data);
  download(csv, 'text/csv', `LASTen ${testVersion} - Report`);
};

export default exportReport;
