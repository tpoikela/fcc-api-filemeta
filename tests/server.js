
process.env.NODE_ENV = 'test';

var chai = require("chai");
var expect = chai.expect;

var chaiHTTP = require("chai-http");
chai.use(chaiHTTP);

var request = require("request");
var server = require("../index");

var img_api = "/api/imagesearch";
var latest_api = "/api/latest/imagesearch";

describe("/", () => {
    it("Should get index.html from server", (done) => {
        chai.request(server).get("/")
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.be.html;
            done();
        });
    });
});

// Test code from: 
// http://stackoverflow.com/questions/10120866/how-to-unit-test-with-a-file-upload-in-mocha

var filename = 'tests/test_upload_file.txt'
  , boundary = Math.random()

describe("/fileupload", () => {

	it("Should upload a file correctly", (done) => {
		chai.request(server)
		  .post('/fileupload')
		  .set('Content-Type', 'multipart/form-data; boundary=' + boundary)
		  .write('--' + boundary + '\r\n')
		  .write('Content-Disposition: form-data; name="fileupload"; filename="'+filename+'"\r\n')
		  .write('Content-Type: text\r\n')
		  .write('\r\n')
		  .write(fs.readFileSync('tests/'+filename))
		  .write('\r\n--' + boundary + '--')
		  .end((res) => {
			res.should.have.status(200);
			done();
		  });
	});

});

