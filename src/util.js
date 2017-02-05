/**
 * An Inverted Index Utility class
 * @class
 */
class Util {
  /**
   * class constructor
   * @constructor
   * For Data Initialization
   **/
  constructor() {
    this.rawFile = {};
    this.allFileUploads = {};
    this.msg = '';
    this.fileHighestLength = {};
    this.searchResult = {};
    this.file = {};
  }
  /**
   * Function validateFile to
   * validate if file input
   * is a json file
   * @returns {Boolean}
   */
  validateFile(uploadedFile, fileName) {
    this.allFileUploads = invertedClassObj.allFiles;
    this.file = uploadedFile;
    console.log('@here' + this.file.length);
    const selectedFile = invertedUIObj.getSelectedFileToCreate();
    for (const key in this.allFileUploads) {
      if (key === this.file.name) {
        this.msg = 'File already Exist!';
        invertedUIObj.notificationBoard(this.msg, 'error');
        return false;
      }
    }
    if (!this.file) {
      this.msg = 'No file selected';
      invertedUIObj.notificationBoard(this.msg, 'error');
      return false;
    }
    if (this.file.type !== 'application/json') {
      this.msg = 'File MUST be JSON!';
      invertedUIObj.notificationBoard(this.msg, 'error');
      return false;
    }
    if (this.file.size === 0) {
      this.msg = 'File cannot be EMPTY!';
      invertedUIObj.notificationBoard(this.msg, 'error');
      return false;
    }
    invertedUIObj.fileReader(this.file);
  }
  /**
   * Function searchIndexTest to
   * validate if query input
   * is valid
   */
  searchIndexTest(searchQuery) {
    const selectedFile = invertedUIObj.getSelectedFileToSearch();
    const functionCallName = 'search';
    if (typeof this.allFileUploads === 'undefined' || this.allFileUploads[selectedFile] === 'undefined' || !this.file.name || typeof this.file === 'undefined') {
      this.msg = 'You have to firstly Create Index!';
      invertedUIObj.notificationBoard(this.msg, 'error');
    } else if (typeof this.file.name === 'undefined') {
      this.msg = 'Empty Input Detected!';
      invertedUIObj.notificationBoard(this.msg, 'error');
    } else {
      if (selectedFile === 'all') {
        this.searchResult = invertedClassObj.searchIndex(searchQuery, selectedFile);
        invertedUIObj.displayToViewAllSearch(this.searchResult, functionCallName);
      }
       if (selectedFile !== null && selectedFile !== 'all') {
        this.searchResult = invertedClassObj.searchIndex(searchQuery, selectedFile);
        invertedUIObj.displayToView(this.searchResult, functionCallName, selectedFile);
      }
      if (!selectedFile) {
        this.searchResult = invertedClassObj.searchIndex(searchQuery, this.file.name);
        invertedUIObj.displayToView(this.searchResult, functionCallName, this.file.name);
      }
    }
  }
}
