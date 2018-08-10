/**
 * Summary 
 * A file is opened and valid characters (v^<>) are stored in an array, 
 * to be returned one at a time when next() is called. 
 * 
 * File contents are read line by line, as needed, with the array repopulated 
 * with the line contents. 
 */

const lineReader = require('line-reader');

const state = {
  reader: null,
  queuedInputs: [],
};

function tryNextLine() {
  return new Promise(resolve => {
    if (!state.reader.hasNextLine()) {
      state.reader.close(function(err) {});
      resolve(null);
    }

    let foundLine = false;

    while (!foundLine && state.reader.hasNextLine()) {
      state.reader.nextLine(function(err, line) {
        if (err) throw err;

        if (line) {
          foundLine = true;
          state.queuedInputs = line.toLowerCase().match(/[<>^v]/g);
          resolve(state.queuedInputs.shift());
        }
      });
    }

    resolve(null);
  });
}

exports.next = () => {
  return new Promise(async resolve => {
    if (state.queuedInputs.length) {
      resolve(state.queuedInputs.shift());
      return;
    }

    const value = await tryNextLine();
    resolve(value);
  });
};

exports.open = path => {
  return new Promise(resolve => {
    lineReader.open(path, (err, reader) => {
      if (err) throw err;
      state.reader = reader;
      resolve();
    });
  });
};
