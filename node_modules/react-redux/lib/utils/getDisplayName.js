'use strict';

exports.__esModule = true;
exports['default'] = getDisplayName;

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

module.exports = exports['default'];