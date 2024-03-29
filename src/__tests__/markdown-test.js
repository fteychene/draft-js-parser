jest.autoMockOff()

describe("Draft js parser | Test Markdown mapping", () => {
  const parser = require("../index").parser
  const markdownMapping = require("../../examples/markdownMapping").default
  const markdownParser = parser(markdownMapping)

  it("Parse simple structure", () => {
    const data = {
      blocks: [{
        text: "simple text structure",
        type: "unstyled"
      }]
    }
    const markdownString = markdownParser(data)
    expect(markdownString).toBe("    simple text structure")
  })

  it("Parse structure with simple inline style", () => {
    const data = {
      blocks: [{
        text: "simple text structure",
        type: "unstyled",
        inlineStyleRanges: [{
          length: 4,
          offset: 7,
          style: "BOLD"
        }]
      }]
    }
    const markdownString = markdownParser(data)
    expect(markdownString).toBe("    simple **text** structure")
  })

  it("Parse structure with multiple inline style on one word", () => {
    const data = {
      blocks: [{
        text: "simple text structure",
        type: "unstyled",
        inlineStyleRanges: [{
          length: 4,
          offset: 7,
          style: "BOLD"
        }, {
          length: 4,
          offset: 7,
          style: "ITALIC"
        }]
      }]
    }
    const markdownString = markdownParser(data)
    expect(markdownString)
      .toBe("    simple **_text_** structure")
  })

  it("Parse structure with multiple header", () => {
    const data = {
      blocks: [{
        text: "Header 1",
        type: "header-one"
      }, {
        text: "Header 2",
        type: "header-two"
      }, {
        text: "Header 3",
        type: "header-three"
      }, {
        text: "Header 4",
        type: "header-four"
      }, {
        text: "Header 5",
        type: "header-five"
      }, {
        text: "Header 6",
        type: "header-six"
      }]
    }
    const markdownString = markdownParser(data)
    expect(markdownString).toBe(`#Header 1##Header 2###Header 3####Header 4#####Header 5######Header 6`)
  })


})





