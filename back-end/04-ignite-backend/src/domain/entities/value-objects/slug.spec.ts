import { Slug } from "./slug";

describe("Test Slug Class", () => {
  it("should be working normaly", () => {
    const slug = Slug.createFromText("Example question title");

    expect(slug.value).toEqual("example-question-title");
  });
});
