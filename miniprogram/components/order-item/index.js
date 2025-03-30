Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tag: String,
    num: String,
    desc: String,
    thumb: String,
    title: String,
    classes:Array,
    price: {
      type: String,
      observer: 'updatePrice',
    },
    centered: Boolean,
    lazyLoad: Boolean,
    thumbLink: String,
    originPrice: String,
    thumbMode: {
      type: String,
      value: 'aspectFit',
    },
    currency: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updatePrice: function () {
      var price = this.data.price;
      var priceArr = price.toString().split('.');
      this.setData({
        integerStr: priceArr[0],
        decimalStr: priceArr[1] ? '.' + priceArr[1] : '',
      });
    },
    onClickThumb: function () {
      this.jumpLink('thumbLink');
    },
    onClose:function(event) {
      console.log(event);
      const { position, instance } = event.detail;
      switch (position) {
        case 'left':
        case 'cell':
          instance.close();
          break;
        case 'right':
          Dialog.confirm({
            message: '确定删除吗？',
          }).then(() => {
            instance.close();
          });
          break;
      }
    },
  }
})
