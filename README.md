# vue-slide
> A slide component for Vue. :boom: :boom: :boom: :boom:

[live demo](http://ihanyang.github.io/demo/vue-slide)
## Installing

``` bash
$ npm install vue-slide2 --save
```
## Example
```vue
<template>
    <slide :imgs="imgs" :currentIndex="index" v-if="slideStatus" @hiddenSlide="hiddenSlide"></slide>
</template>

<script>
    import slide from "vue-slide2"

    export default {
        data() {
            imgs: [],
            index: 0,
            slideStatus: false
        },
        methods: {
        	hiddenSlide() {
        		this.slideStatus = false
        	}
        }
    }
</script>
```
## Options

### Props
Props | Type | Default | Description
------------ | ------------- | ------------- | -------------
imgs | Array | null | The image of the slide.
currentIndex | Number | 0 | The index of the slide.

### Events
Name | Description
------------ | -------------
hiddenSlide | Hide the slide.