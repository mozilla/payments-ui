const productData = {
  'mozilla-concrete-brick': require('json!mozilla-concrete-brick'),
  'mozilla-concrete-mortar': require('json!mozilla-concrete-mortar'),
  'mozilla-foundation-donation': require('json!mozilla-foundation-donation'),
};

export default productData;


export function get(id) {
  if (!productData[id]) {
    throw new Error('Invalid product: ' + id);
  }
  return productData[id];
}
