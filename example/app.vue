<style>
body, div, p, header {
	padding: 0;
	margin: 0;
}
#app {
	width: 7.5rem;
	margin: 0 auto;
}
header {
	font-size: .36rem;
	text-align: center;
	border-bottom: 1px solid #EEE;
	line-height: .88rem;
}
.img-list {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: .24rem;
}
.img-item {
	width: 2.2rem;
	height: 2.2rem;
	margin-bottom: .24rem;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
}
.overflow {
	height: 100vh;
	overflow: hidden;
}
</style>

<template>
	<div id="app" :class="{overflow: slideStatus}">
		<header>vue-slide</header>
		<div class="img-list">
			<div class="img-item" :style="{backgroundImage: 'url(' + img + ')'}" v-for="(img, index) of imgs" @click="showImg(index)"></div>
		</div>
		<slide :imgs="imgs" :currentIndex="index" v-if="slideStatus" @hiddenImg="hiddenImg"></slide>
	</div>
</template>

<script>
	import slide from "./components/slide"

	export default {
		data() {
			return {
				imgs: [
					"./images/4eafaa70ly1fe80ipjpdkj22c02c07wh.jpg",
					"./images/5dad5135ly1fewkv62lz5j21ul11gkh4.jpg",
					"./images/6a3f5a25gy1fewugbrd06j20qp0qrgre.jpg",
					"./images/6ca647dcly1fewdrgbjaxj20k0183qa0.jpg",
					"./images/60a3704aly1fewsiubi4lj21w02d0hdt.jpg",
					"./images/00659XvZgy1fevofjc90zj31901o0x6r.jpg",
					"./images/6106a4f0ly1feww7tar4lj20ro0zkavl.jpg",
					"./images/734235e7gy1fepy8mqj3uj20yi1a04qq.jpg",
					"./images/734235e7gy1fepy9s952vj20yi1a04qq.jpg",
					],
				index: 0,
				slideStatus: false
			}
		},
		components: {
			slide
		},
		created() {
			const value = window.innerWidth
			const deviceWidth = Math.min(640, value)

			document.documentElement.style.fontSize = `${deviceWidth / 7.5}px`
		},
		methods: {
			showImg(index) {
				this.index = index

				this.slideStatus = true
			},
			hiddenImg() {
				this.slideStatus = false
			}
		}
	}
</script>