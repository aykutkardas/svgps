import _ from 'lodash';

const keyToCamelCase = (data) =>
  _.mapKeys(data, (value, key) => _.camelCase(key));

export default keyToCamelCase;
