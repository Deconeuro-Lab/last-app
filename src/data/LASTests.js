const LASTests =
{
  A: {
    naming: [
      {
        item: 'phone',
        jpg: 'test-phone.jpg',
        acceptableResponses: ['telephone', 'phone', 'coordless phone', 'house phone (Eng)'],
        incorrectResponses: ['cell (phone)', 'mobile (phone)', 'i phone']
      },
      {
        item: 'pineapple',
        jpg: 'test-pineapple.jpg',
        acceptableResponses: ['pineapple'],
        incorrectResponses: []
      },
      {
        item: 'pen',
        jpg: 'test-pen.jpg',
        acceptableResponses: ['pen', 'ballpoint pen', 'ink pen (USA)', 'biro (Aus, Eng)'],
        incorrectResponses: ['feather pen', 'felt tip pen', 'fountain pen']
      },
      {
        item: 'croc',
        jpg: 'test-croc.jpg',
        acceptableResponses: ['crocodile', 'alligator', 'gator ("say the whole word")', 'croc ("say the whole word")'],
        incorrectResponses: []
      },
      {
        item: 'fork',
        jpg: 'test-fork.jpg',
        acceptableResponses: ['fork', 'dessert fork'],
        incorrectResponses: ['pitch fork']
      }
    ],
    repetition: ['Duplication', 'My neighbour took a letter to the post office.'],
    autoseq: ['count from 1 to 10'],
    picID: ['Racket/Racquet', 'Spoon', 'Ice Cream', 'Eye'],
    verbal: ['Point to the ceiling', 'Take the pen, but not the cup', 'Put your hand on your head, and then your finger on your nose']
  },
  B: {
    naming: [
      {
        item: 'pencil',
        jpg: 'test-pencil.jpg',
        acceptableResponses: ['pencil', 'lead pencil', 'pencil crayong (Can)', 'coloured pencil'],
        incorrectResponses: ['screen']
      },
      {
        item: 'television',
        jpg: 'test-tv.jpg',
        acceptableResponses: ['television', 'TV', 'Telly (Eng)', 'TV set', 'TV monitor', 'TV screen', 'monitor'],
        incorrectResponses: ['screen']
      },
      {
        item: 'giraffe',
        jpg: 'test-giraffe.jpg',
        acceptableResponses: ['giraffe'],
        incorrectResponses: []
      },
      {
        item: 'knife',
        jpg: 'test-knife.jpg',
        acceptableResponses: ['knife', 'butter knife', 'dessert knife'],
        incorrectResponses: ['kitchen knife', 'steak knife']
      },
      {
        item: 'butterfly',
        jpg: 'test-butterfly.jpg',
        acceptableResponses: ['monarch (Can, USA)'],
        incorrectResponses: ['moth']
      }
    ],
    repetition: ['Publication', 'The tourist bought a ticket to the early show.'],
    autoseq: ['count from 1 to 10'],
    picID: ['Cat', 'Hand', 'Car', 'Tomato'],
    verbal: ['Point to the floor', 'Take the key, but not the paper', 'Touch your ear with one finger, and then your forehead with two fingers']
  },
  categoriesInOrder: ['naming', 'repetition', 'autoseq', 'picID', 'verbal']
}

export default LASTests;