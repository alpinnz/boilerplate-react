module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow src/pages and src/local at app root',
    },
    messages: {
      forbiddenRootDir: 'Root app directories src/pages and src/local are forbidden. Use src/features/<feature>/pages instead.',
    },
    schema: [],
  },
  create(context) {
    const fileName = context.getFilename().replace(/\\/g, '/');
    if (fileName.includes('/src/pages/') || fileName.includes('/src/local/')) {
      return {
        Program(node) {
          context.report({
            node,
            messageId: 'forbiddenRootDir',
          });
        },
      };
    }

    return {};
  },
};
