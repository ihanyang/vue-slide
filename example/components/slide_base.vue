<template>
	<div :style="{width: length * width + 'px', transform: 'translateX(-' + width * index + 'px) translateZ(0)'}" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			length: {
				type: Number,
				required: true
			},
			currentIndex: {
				type: Number,
				default: 0,
			}
		},
		data() {
			return {
				width: window.innerWidth,
				index: this.currentIndex
			}
		},
		computed: {
			offset() {
				return this.width * this.index
			}
		},
		watch: {
			currentIndex(value) {
				this.index = value
			}
		},
		methods: {
			touchstart(e) {
				const target = e.currentTarget

				target.style.transition = "none"

				target.time = Date.now()
				target.max = (this.length - 1) * this.width

				target.startX = e.touches[0].clientX
				target.startY = e.touches[0].clientY

				this.$emit("start")
			},
			touchmove(e) {
				const target = e.currentTarget
				const touch = e.touches[0]
				const max = target.max
				const offset = this.offset

				const x = touch.clientX - target.startX
				const y = touch.clientY - target.startY

				// 判断用户手势动作
				if (typeof this.isX === "undefined") {
					this.isX = Math.abs(y) / Math.abs(x) < 1
				}

				if (this.isX) {
					// 向左滑动
					if (x < 0) {
						if (Math.abs(x) + Math.abs(offset) > max) {
							requestAnimationFrame(() => {
								target.style.transform = `translateX(-${(Math.abs(x) / 4) + Math.abs(offset)}px)`
							})

							e.preventDefault()

							return
						}

						requestAnimationFrame(() => {
							target.style.transform = `translateX(${x + - offset}px)`
						})

						this.$emit("move", x + - offset)
					} else {
						const result = - (offset - x)

						if (result > 0) {
							requestAnimationFrame(() => {
								target.style.transform = `translateX(${x / 4}px)`
							})

							e.preventDefault()

							return
						}

						requestAnimationFrame(() => {
							target.style.transform = `translateX(${result}px)`
						})

						this.$emit("move", result)
					}

					e.preventDefault()

				}
			},
			touchend(e) {
				const target = e.currentTarget
				const touch = e.changedTouches[0]
				const offset = this.offset
				const currentOffset = target.startX - touch.clientX
				const max = target.max
				const time = Date.now() - target.time

				const x = touch.clientX - target.startX
				const y = touch.clientY - target.startY


				if (! this.isX) {
					delete this.isX

					return
				}

				delete this.isX

				target.style.transition = "all .3s"

				if (currentOffset > 0 && offset === max) {
					requestAnimationFrame(() => {
						target.style.transform = `translateX(${-max}px)`
					})

					return
				}

				if (currentOffset < 0 && offset === 0) {
					requestAnimationFrame(() => {
						target.style.transform = `translateX(0)`
					})

					return
				}

				// 滑动速度快
				if (time < 100) {
					if (currentOffset > 0) {
						this.setTransform(target, 1)
					} else {
						this.setTransform(target)
					}
				} else {
					if (Math.abs(currentOffset) >= this.width / 3) {
						currentOffset > 0 ? this.setTransform(target, 1) : this.setTransform(target)

					} else {
						requestAnimationFrame(() => {
							target.style.transform = `translateX(${- offset}px)`
						})

						this.$emit("end", this.index)
					}
				}
			},
			setTransform(target, direction) {
				direction ? this.index++ : this.index--

				this.offset = this.index * this.width

				requestAnimationFrame(() => {
					target.style.transform = `translateX(${- this.width * this.index}px)`
				})

				this.$emit("end", this.index)
				this.$emit("changeIndex", this.index)
			}
		}
	}
</script>