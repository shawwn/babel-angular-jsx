var angularjsx = require("angular-jsx");
var assert = require("assert");

describe("angularjsx", function () {
    it("should not touch empty object", function () {
        assert.equal(angularjsx.convert("var x = {}"), "var x = {}");
    });
    it("should not touch object with properties", function () {
        assert.equal(angularjsx.convert("var x = {a: 1}"), "var x = {a: 1}");
    });
    it("should convert simple JSX template", function () {
        assert.equal(angularjsx.convert("var x = {template: <div></div>}"), "var x = {template: \"<div></div>\"}");
    });
    it("should convert multi-line JSX template", function () {
        assert.equal(angularjsx.convert("var x = {template: <div>\n</div>}"), "var x = {template: \"<div>\\n</div>\"}");
    });
    it("should convert JSX with quotes", function () {
        assert.equal(angularjsx.convert("var x = {template: <div class=\"foo\"></div>}"), "var x = {template: \"<div class=\\\"foo\\\"></div>\"}");
    });
    it("should ignore non-JSX properties named 'template'", function () {
        assert.equal(angularjsx.convert("var x = {template: {\n}}"), "var x = {template: {\n}}");
    });
    it("should ignore string template", function () {
        assert.equal(angularjsx.convert("var x = {template: \"<br/>\"}"), "var x = {template: \"<br/>\"}");
    });
    it("should handle dots and curly braces in span", function () {
        assert.equal(angularjsx.convert("var x = {template: <span>{{a.b}}</span>}"), "var x = {template: \"<span>{{a.b}}</span>\"}");
    });
    it("should handle parentheses", function () {
        assert.equal(angularjsx.convert("var x = {template: (<br/>)}"), "var x = {template: (\"<br/>\")}");
    });
    it("should replace the className attribute with class", function() {
        assert.equal(angularjsx.convert("var x = {template: <div className=\"test\"></div>}"),'var x = {template: "<div class=\\"test\\"></div>"}');
    });
    it("should ignore className when it is not an attribute", function() {
        assert.equal(angularjsx.convert("var x = {template: <div foo=\"className\"></div>}"),'var x = {template: "<div foo=\\"className\\"></div>"}');
        assert.equal(angularjsx.convert("var x = {template: <div>className</div>}"),'var x = {template: "<div>className</div>"}');
    });
    it("should parse simple template in Angular directive", function () {
        assertFixture(0);
    });

    it("should parse multi-line template in Angular directive", function () {
        assertFixture(1);
    });

    function assertFixture(index) {
        var fs = require("fs");

        function input(index) {
            return fs.readFileSync("test/fixtures/" + index + "in.js", "utf8");
        }

        function expectedOutput(index) {
            return fs.readFileSync("test/fixtures/" + index + "out.js", "utf8");
        }

        assert.equal(angularjsx.convert(input(index)), expectedOutput(index));
    }
});
