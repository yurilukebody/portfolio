export default function (eleventyConfig) {
	// 静的アセットはそのまま出力へコピーする
	eleventyConfig.addPassthroughCopy("src/images");
	eleventyConfig.addPassthroughCopy("src/script");
	eleventyConfig.addPassthroughCopy("src/style");

	return {
		dir: {
			input: "src",
			output: "_site",
			includes: "_includes",
			data: "_data"
		},
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk"
	};
}
