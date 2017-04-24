<style>
.slide-container {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	overflow: hidden;
	background-color: #000;
}
.slide-container p {
	position: absolute;
	top: .7rem;
	left: 50%;
	color: #FFF;
	font-size: .36rem;
	transform: translateX(-50%);
}

.slide-wrapper {
	display: flex;
}
.slide-item {
	display: flex;
	align-items: center;
	width: 100vw;
	height: 100vh;
	overflow: auto;
}
.slide-item img {
	width: 100%;
}

.no-flex {
	display: block;
}
.scale-enter-active, .scale-leave-active {
	transition: all .2s;
}
.scale-enter, .scale-leave-active {
	opacity: 0;
	transform: scale(.6);
}
</style>

<template>
	<transition name="scale">
		<div class="slide-container">
			<slide-base class="slide-wrapper" :length="imgs.length" :currentIndex="currentIndex" @changeIndex="changeIndex">
				<div class="slide-item" v-for="(img, index) of imgs">
					<img :src="img" @click="hiddenImg" @load.once="load">
				</div>
			</slide-base>
			<p>{{index + 1}}/{{imgs.length}}</p>
		</div>
	</transition>
</template>

<script>
	import slideBase from "./slide_base"

	export default {
		props: {
			imgs: {
				type: Array,
				required: true
			},
			currentIndex: {
				type: Number,
				default: 0,
			}
		},
		data() {
			return {
				index: this.currentIndex
			}
		},
		components: {
			slideBase
		},
		methods: {
			load(e) {
				const target = e.target
				const viewportHeight = window.innerHeight

				if (target.height > viewportHeight) {
					target.parentNode.classList.add("no-flex")
				}
			},
			hiddenImg() {
				this.$emit("hiddenImg")
			},
			changeIndex(value) {
				this.index = value
			}
		}
	}
</script>