import JSZip from "jszip";
// import flpSandBox from "../Assets/OPAfiles/flpSandbox.html";

class OPAFileHandler {
  static parseZip(zipFile, setFile) {
    function addOPAconfigFiles(file) {
      fetch("../Assets/OPAfiles/flpSandbox.html")
        .then((response) => response.text())
        .then((text) => {
          file.file("webapp/test/flpSandbox.html", text);
        });
      fetch("../Assets/OPAfiles/flpSandboxMockServer.html")
        .then((response) => response.text())
        .then((text) => {
          file.file("webapp/test/flpSandboxMockServer.html", text);
        });
      fetch("../Assets/OPAfiles/testLinks.fragment.html")
        .then((response) => response.text())
        .then((text) => {
          file.file("webapp/test/testLinks.fragment.html", text);
        });
      fetch("../Assets/OPAfiles/testsuite.qunit.html")
        .then((response) => response.text())
        .then((text) => {
          file.file("webapp/test/testsuite.qunit.html", text);
        });
        fetch("../Assets/OPAfiles/Common.js")
        .then((response) => response.text())
        .then((text) => {
          file.file("webapp/test/integration/pages/Common.js", text);
        });
    }
    // parsing
    var new_zip = new JSZip();
    // more files !
    new_zip.loadAsync(zipFile).then(
      function (zip) {
        // you now have every files contained in the loaded zip
        addOPAconfigFiles(zip);
        setFile(zip);
      }.bind(addOPAconfigFiles)
    );
  }

  static getFile(sPath, sType) {
    
  }

  static putFile(sPath) {}
}

export default OPAFileHandler;
