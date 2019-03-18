import Vue from "vue";
import DataSource from "../store/source";

// HOCの第１引数にはコンポーネントを受け取り、第２引数には
// データソースが変更されるたびに呼び出されるメソッドを渡す
// 渡されたメソッドはpropとして新しく作成されたコンポーネントに
// 渡す必要がある更新されたデータを返す。
const withSubscription = (component, selectData) => {
  const inheritedProps = component.props || [];

  return Vue.component("withSubscription", {
    render(createElement) {
      return createElement(component, {
        props: {
          ...inheritedProps,
          data: this.fetchedData
        },
        on: { ...this.$listeners }
      });
    },
    props: [...inheritedProps],
    data() {
      return {
        fetchedData: null
      };
    },
    methods: {
      handleChange() {
        this.fetchedData = selectData(DataSource, this.$props);
      }
    },
    mounted() {
      DataSource.addChangeListener(this.handleChange);
    },
    beforeDestroy() {
      DataSource.removeChangeListener(this.handleChange);
    }
  });
};

export default withSubscription;
