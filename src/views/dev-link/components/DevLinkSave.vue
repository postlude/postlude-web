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
			<v-btn v-if="!devLink?.id" color="red-darken-1" variant="flat" @click="resetInput">
				<v-icon>mdi-cancel</v-icon>
			</v-btn>
			<v-btn v-if="devLink?.id" color="yellow-lighten-1" variant="flat" @click="restoreInput">
				<v-icon>mdi-minus-thick</v-icon>
			</v-btn>
			<v-btn color="grey-darken-1" variant="flat" @click="$emit('close')">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { addDevLink, setDevLink } from '@/util/api';

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
				id: null,
				title: null,
				url: null,
				tags: []
			},
			newTag: null
		};
	},
	mounted() {
		this.newDevLink.id = this.devLink?.id || null;
		this.newDevLink.title = this.devLink?.title;
		this.newDevLink.url = this.devLink?.url;
		this.newDevLink.tags = this.devLink?.tags ? this.devLink.tags.slice(0) : [];
	},
	methods: {
		async save() {
			if (this.devLink?.id) {
				await setDevLink(this.devLink.id, this.newDevLink);
			} else {
				await addDevLink(this.newDevLink);
			}

			this.$emit('close');
		},
		addTag() {
			if (!this.newTag) {
				return;
			}

			if (this.newDevLink.tags.includes(this.newTag)) {
				this.newTag = null;
				return;
			}

			this.newDevLink.tags.push(this.newTag);
			this.newTag = null;
		},
		removeTag(tagIndex) {
			this.newDevLink.tags.splice(tagIndex, 1);
		},
		resetInput() {
			this.newTag = null;
			this.newDevLink = {
				title: null,
				url: null,
				tags: []
			};
		},
		restoreInput() {
			this.newTag = null;
			this.newDevLink.title = this.devLink.title;
			this.newDevLink.url = this.devLink.url;
			this.newDevLink.tags = this.devLink.tags.slice(0);
		}
	}
};
</script>