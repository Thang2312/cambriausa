(function() {
  var PaintMatcher;

  $(function() {
    return PaintMatcher.init();
  });

  PaintMatcher = {
    EXT_URL: function() {
      return CAMBRIA.extURL || (CAMBRIA.extURL = "http://www.benjaminmoore.com/en-us/paint-color/");
    },
    FALLBACK: function() {
      return CAMBRIA.fallbackTile || (CAMBRIA.fallbackTile = "Cambrian Gold");
    },
    init: function() {
      this._setupDefaultState();
      return this._bindEvents();
    },
    _setupDefaultState: function() {
      var colorObj, defaultInput, defaultTile, params, selectedPaint;
      params = this._parseUrlParameters();
      defaultTile = params.ColorID.full;
      selectedPaint = params.PaintID;
      console.log('sp1: ' + selectedPaint);
      if (selectedPaint) { // Clean up for a Paint named "Baby'sBreath" and others like it.
          selectedPaint = decodeURIComponent(selectedPaint).replace(/'/g, '');
          console.log('sp2: ' + selectedPaint);
      }
      if (!CAMBRIA.tiles[defaultTile]) defaultTile = this.FALLBACK();
      defaultInput = $('.tile-palette').find("input[value='" + defaultTile + "']");
      defaultInput.attr('checked', 'checked');
      $('.order-sample').attr('href', CAMBRIA.tiles[defaultTile].storeURL);
      colorObj = {
        name: defaultTile,
        image: CAMBRIA.tiles[defaultTile].paintMatchToolImage,
        url: CAMBRIA.tiles[defaultTile].detailURL
      };
      this._generatePaintTiles(defaultTile, selectedPaint);
      this._updateTilePanel(colorObj);
      return this._updatePaintPanel(this._returnColorData($('.selected-color')));
    },
    _bindEvents: function() {
      var colorTriggers, tileContainer,
        _this = this;
      colorTriggers = $('.activate-color');
      tileContainer = $('.tile-palette .scrolldiv');
      colorTriggers.click(function(e) {
        var target;
        e.preventDefault();
        target = $(e.target);
        return _this._updatePaintPanel(_this._returnColorData(target));
      });
      return tileContainer.delegate('input', 'click', function(e) {
        var target;
        // e.preventDefault();
        target = $(e.target);
        _this._updateTilePanel(_this._returnTileData(target));
        return _this._generatePaintTiles(target.val());
      });
    },
    _returnColorData: function(el) {
      var choice, colorContainers, colorGroup, colorName, hex, key, obj;
      colorContainers = $('.color');
      colorContainers.removeClass('selected-color');
      choice = el.closest('.color').addClass('selected-color');
      hex = choice.find('.swatch').data('hex');
      colorName = choice.find('.swatch-name').text();
      key = choice.find('.swatch-key').text();
      colorGroup = choice.find('.swatch-color-group').text();
      obj = {
        name: "" + colorName + ", ",
        hex: hex,
        group: colorGroup,
        key: key
      };
      return obj;
    },
    _returnTileData: function(el) {
      var color, name, obj;
      name = el.val();
      color = CAMBRIA.tiles[name];
      obj = {
        name: name,
        image: color.paintMatchToolImage,
        url: color.detailURL,
        storeURL: color.storeURL
      };
      return obj;
    },
    _updatePaintPanel: function(obj) {
      var colorBar, panel;
      panel = $('.paint');
      panel.css({
        'backgroundColor': obj.hex
      });
      panel.find('.outbound-paint').attr('href', this.EXT_URL() + obj.key);
      colorBar = $('.color-name');
      colorBar.find('.selected-name .color-choice').text(obj.name);
      colorBar.find('.selected-name .grouping').text(obj.group);
      return colorBar.find('.outbound-link').attr('href', this.EXT_URL() + obj.key);
    },
    _updateTilePanel: function(obj) {
      var panel, tileBar;
      panel = $('.tile');
      panel.find('.current-cambria-tile').attr('src', obj.image);
      panel.find('.outbound-tile').attr('href', obj.url);
      $('.order-sample').attr('href', obj.storeURL);
      tileBar = $('.tile-name');
      tileBar.find('.selected-name').html("" + obj.name + "<sup>&trade;</sup>");
      return tileBar.find('.outbound-link').attr('href', obj.url);
    },
    _generatePaintTiles: function(color, selectedPaint) {
      var allColors, chosenPaint, firstSwatch, hasPaint, paint, paintContainer, paintWrapper, paints, processedPaints, rowOne, rowTwo;
      if (selectedPaint == null) selectedPaint = 'none';
      paintContainer = $('.paint-palette');
      paintContainer.empty();
      paints = CAMBRIA.tiles[color].benMooreComplementaryColors;
      for (paint in paints) {
        paintContainer.append(this._createTile(paints[paint]));
      }
      allColors = paintContainer.find('.color');
      processedPaints = this._returnSetsOf(allColors, 2);
      paintWrapper = '<div class="color-row"></div>';
      rowOne = $(processedPaints[0]);
      rowTwo = $(processedPaints[1]);
      rowOne.wrapAll(paintWrapper);
      rowTwo.wrapAll(paintWrapper);
      rowTwo.parent().addClass('odd');
      rowOne.first().addClass('first-color selected-color');
      rowTwo.first().addClass('first-color');
      chosenPaint = paintContainer.find("." + selectedPaint);
      hasPaint = chosenPaint.length > 0;
      if (selectedPaint === 'none' || hasPaint === false) {
        firstSwatch = this._returnColorData(rowOne.first().find('.swatch'));
      } else {
        firstSwatch = this._returnColorData(chosenPaint);
      }
      return this._updatePaintPanel(firstSwatch);
    },
    _createTile: function(data) {
      var formatName, group, id, item, itemLink, key, name, paintContainer, swatch;
      paintContainer = $('.paint-palette');
      item = $('#playpen .color').clone(true);
      item.addClass(data.key);
      swatch = item.find('.swatch');
      name = item.find('.swatch-name');
      group = item.find('.swatch-color-group');
      key = item.find('.swatch-key');
      id = item.find('.swatch-id');
      formatName = data.name;
      itemLink = item.find('> a');
      swatch.css({
        backgroundColor: data.hexCode
      });
      swatch.attr('data-hex', data.hexCode);
      group.html(data.associationType);
      key.html(data.key);
      id.html(data.id);
      name.html(formatName);
      itemLink.attr('data-eventsource', data.key);
      return item;
    },
    _parseUrlParameters: function() {
      var checkedParam, param, params, parsedParams, split, _i, _len;
      params = window.location.href;
      params = params.slice(params.indexOf('?') + 1).split('&');
      parsedParams = {};
      for (_i = 0, _len = params.length; _i < _len; _i++) {
        param = params[_i];
        split = param.split('=');
        parsedParams[split[0]] = split[1];
      }
      checkedParam = this._returnManagedParameters(parsedParams.ColorID);
      parsedParams.ColorID = checkedParam;
      return parsedParams;
    },
    _returnManagedParameters: function(param) {
      var obj;
      obj = {};
      if (param != null ? param.match(/%20/) : void 0) {
        obj.full = param.replace("%20", " ");
        obj.dashed = param.replace("%20", "-").toLowerCase();
        obj.lowercase = param.replace("%20", " ").toLowerCase();
      } else {
        obj.full = param;
      }
      return obj;
    },
    _returnSetsOf: function(origArray, setOf) {
      var finalArr, setArray, status;
      status = 0;
      finalArr = [];
      setArray = [];
      origArray.each(function() {
        status += 1;
        setArray.push(this);
        if (status === setOf) {
          finalArr.push(setArray);
          status = 0;
          return setArray = [];
        }
      });
      return finalArr;
    }
  };

}).call(this);
