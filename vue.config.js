module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/_buefy.scss";
        `,
      },
    },
  },
};
