<template>
		<v-card>
			<v-card-title>개발 링크 저장</v-card-title>

			<v-form>
				<v-text-field v-model="newDevLink.title" :counter="100" :clearable="true" label="제목" />
				<v-textarea v-model="newDevLink.url" :counter="500" :rows="3" :clearable="true" label="링크" />
				<v-text-field v-model="newTag" label="태그" @keypress.enter="addTag" />
				<v-chip v-for="(t, i) in newDevLink.tags" :key="t" closable class="ma-1" @click:close="removeTag(i)">
					{{ t }}
				</v-chip>
			</v-form>

			<v-divider />

			<v-card-actions class="d-flex justify-space-evenly">
				<v-btn color="blue-lighten-2" variant="flat" @click="save">
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
				<v-btn color="red-darken-1" variant="flat" @click="resetInput">
					<v-icon>mdi-cancel</v-icon>
				</v-btn>
				<v-btn color="grey-darken-1" variant="flat" @click="resetInput">
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-card-actions>
		</v-card>
</template>

<script>
export default {
	name: 'DevLinkSave',
	props: {
		devLink: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			newDevLink: {
				title: null,
				url: null,
				tags: []
			},
			newTag: null
		};
	},
	mounted() {
		this.newDevLink.title = this.devLink.title;
		this.newDevLink.url = this.devLink.url;
		this.newDevLink.tags = this.devLink.tags;
	},
	methods: {
		addTag() {
			if(!this.newTag) {
				return;
			}

			this.newDevLink.tags.push(this.newTag);
			this.newTag = null;
		},
		removeTag(tagIndex) {
			this.newDevLink.tags.splice(tagIndex, 1);
		},
		async save() {

		},
		resetInput() {
			this.newDevLink = {
				title: null,
				url: null,
				tags: []
			};
		}
		// async mdfyDevLink(arg) {
		// 	try {
		// 		const { code } = await mdfyDevLink(arg);

		// 		if (code === RSPNS.SUCCES) {
		// 			this.$message({ type: 'success', message: '수정 성공' });
		// 			this.$emit('close');
		// 		} else {
		// 			throw new Error(code);
		// 		}
		// 	} catch (err) {
		// 		console.error(err);
		// 		this.$message({ type: 'error', message: '에러가 발생했습니다.' });
		// 	}
		// }
	}
};
</script>