jest.autoMockOff()

describe("Draft js parser | Test custom mapping", () => {
  const parser = require("../index").parser
  const texMapping = require("../../examples/customMapping").default
  const customParser = parser(texMapping)

  it("Parse simple structure", () => {
    const data = {
      blocks: [{
        text: "simple text structure",
        type: "unstyled"
      }]
    }
    const htmlString = customParser(data)
    expect(htmlString).toBe("__psimple text structure|p__")
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
    const htmlString = customParser(data)
    expect(htmlString).toBe("__psimple __btext|b__ structure|p__")
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
        }, {
          length: 4,
          offset: 7,
          style: "UNDERLINE"
        }]
      }]
    }
    const htmlString = customParser(data)
    expect(htmlString)
      .toBe("__psimple __b__i__utext|u__|i__|b__ structure|p__")
  })
})

