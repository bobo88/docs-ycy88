### VUE清单 - 组件通信
1、props / emits
	父组件 --> 子组件： props
	子组件 --> 父组件： emits
2、v-model / emits
	父组件 --> 子组件： v-model
	子组件 --> 父组件： emits
3、ref / emits
	父组件 --> 子组件： ref
	子组件 --> 父组件： emits
4、provide / inject
	父组件 --> 子组件： provide
	子组件 --> 父组件： inject
5、EventBus(mitt)
	父组件 --> 子组件： emit / on
	子组件 --> 父组件： emit / on
6、Vuex / pinia
	pinia优点
		同时支持 Composition Api 和 Options api 的语法；
		去掉 mutations ，只有 state 、getters 和 actions ；
		不支持嵌套的模块，通过组合 store 来代替；
		更完善的 Typescript 支持；
		清晰、显式的代码拆分；
	子主题 2
7、expose / ref
	子组件
		defineExpose({
        childName: "这是子组件的属性",
        someMethod(){
            console.log("这是子组件的方法")
        }
    })
	父组件
		<child ref="comp"></child>
		    import { ref } from "vue"
    const comp = ref(null)   // 注意 ref="comp"
    const handlerClick = () => {
        console.log(comp.value.childName) // 获取子组件对外暴露的属性
        comp.value.someMethod() // 调用子组件对外暴露的方法
    }
支持绑定多个v-model，v-model 是 v-model:modelValue 的简写
绑定其他字段，如：v-model:name