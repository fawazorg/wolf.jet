/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
const assign = (target, source) => {
  try {
    const keys = Object.keys(target).reduce((keys, key) => {
      keys[key.toLowerCase()] = key;
      return keys;
    }, {});
    Object.keys(source).forEach((key) => {
      try {
        if (typeof source[key] === "object" && !Array.isArray(source[key]) && !Buffer.isBuffer(source[key]))
          return assign(target[keys[key.toLowerCase()]], source[key]);

        target[keys[key.toLowerCase()] ?? key] = source[key];
        // eslint-disable-next-line no-empty
      } catch (e) {}
    });
    return target;
    // eslint-disable-next-line no-empty
  } catch (e) {}
};

module.exports = {
  assign,
};
