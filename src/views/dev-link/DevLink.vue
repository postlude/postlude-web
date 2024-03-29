<template>
	<v-container>
		<v-row>
			<v-col offset-xl="3" xl="1" offset-lg="2" lg="2" cols="4">
				<v-select v-model="searchType" :items="searchTypes" item-title="name" item-value="value" @update:model-value="clearSearchInput" />
			</v-col>
			<v-col xl="4" lg="4" :cols="$isMobile() ? 6 : 5">
				<v-autocomplete v-show="searchType === 1"
					ref="autocomplete"
					v-model="tagNames"
					:items="allTags"
					v-model:search="autoCompleteInput"
					@update:modelValue="clearAutoComplete"
					label="검색"
					variant="outlined"
					required
					:clearable="true"
					:multiple="true"
				>
					<template v-slot:selection="tag">
						<v-chip v-bind="tag">
							{{ tag.item.raw }}
						</v-chip>
					</template>
				</v-autocomplete>
				<v-text-field v-show="searchType === 2" v-model="title" @keypress.enter="search" label="검색" variant="outlined" required :clearable="true" />
			</v-col>
			<v-col :cols="$isMobile() ? 2 : 1">
				<v-btn color="info" class="mt-3" block :disabled="isSearching" @click="search">
					<v-icon>mdi-magnify</v-icon>
				</v-btn>
			</v-col>
			<v-col v-if="!$isMobile()" cols="1">
				<v-btn color="success" class="mt-3" block :disabled="isSearching" @click="openAddModal">
					<v-icon>mdi-plus</v-icon>
				</v-btn>
			</v-col>
		</v-row>

		<!-- mobile floating button -->
		<v-btn v-if="$isMobile()"
			icon="mdi-plus"
			color="success"
			position="fixed"
			location="bottom right"
			class="mr-3 mb-3"
			elevation="24"
			:disabled="isSearching"
			@click="openAddModal"
		/>

		<v-data-table :headers="headers" :items="devLinks">
			<template v-slot:[`item.title`]="{ item }">
				<a :href="item.raw.url" target="_blank">{{ item.raw.title }}</a>
			</template>

			<template v-slot:[`item.copy`]="{ item }">
				<v-btn color="grey darken-1" :size="buttonSize" @click="copyUrl(item.raw.url)">
					<v-icon>mdi-link</v-icon>
				</v-btn>
			</template>
			<template v-slot:[`item.modify`]="{ item }">
				<v-btn color="green-lighten-1" :size="buttonSize" @click="openModifyModal(item.raw.id)">
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
			</template>
			<template v-slot:[`item.remove`]="{ item }">
				<v-btn color="red-lighten-1" :size="buttonSize" @click="confirmRemoval(item.raw.id)">
					<v-icon>mdi-delete</v-icon>
				</v-btn>
			</template>

			<template v-slot:bottom>
				<v-pagination v-model="page" :length="totalPageCount" @update:modelValue="search" />
			</template>
		</v-data-table>

		<v-dialog v-model="isModalOpen" :width="modalSize" :close-delay="0" :open-delay="0">
			<dev-link-save :dev-link="devLink" :all-tags="allTags" @close="isModalOpen = false" @save="completeSave"/>
		</v-dialog>

		<message :is-open="message.isOpen" :text="message.text" :color="message.color" @close="message.isOpen = false" />
		<confirm :is-open="confirm.isOpen" :text="confirm.text" :color="confirm.color" @close="confirm.isOpen = false" @confirm="remove" />
	</v-container>
</template>

<script>
import DevLinkSave from './components/DevLinkSave.vue';
import Message from '@/components/Message.vue';
import Confirm from '@/components/Confirm.vue';
import { searchDevLinks, removeDevLink, getAllDevLinkTags, getDevLink } from '@/util/api';

export default {
	name: 'DevLink',
	components: {
		Message,
		Confirm,
		DevLinkSave
	},
	data() {
		return {
			searchType: 1,
			searchTypes: [
				{ name: '태그', value: 1 },
				{ name: '제목', value: 2 }
			],
			autoCompleteInput: '',
			allTags: [],
			title: '',
			tagNames: [],
			isSearching: false,

			message: {
				isOpen: false,
				text: '',
				color: undefined
			},
			confirm: {
				isOpen: false,
				text: '',
				color: undefined,
				data: {}
			},

			headers: [
				{
					title: '제목',
					sortable: false,
					align: 'center',
					key: 'title'
				},
				{
					title: '복사',
					sortable: false,
					align: 'center',
					key: 'copy'
				},
				{
					title: '수정',
					sortable: false,
					align: 'center',
					key: 'modify'
				},
				{
					title: '삭제',
					sortable: false,
					align: 'center',
					key: 'remove'
				}
			],
			page: 1,
			itemsPerPage: 10,
			totalCount: 0,
			devLinks: [],

			isModalOpen: false,
			devLink: null,

			removeId: null
		};
	},
	computed: {
		totalPageCount() {
			return Math.ceil(this.totalCount / this.itemsPerPage);
		},
		buttonSize() {
			return this.$isMobile() ? 'x-small' : 'small';
		},
		modalSize() {
			return this.$isMobile() ? '100%' : '50%';
		},
		isSignIn() {
			return this.$store.getters.isSignIn;
		}
	},
	async mounted() {
		const { data } = await getAllDevLinkTags();
		this.allTags = data.map(({ name }) => name);
	},
	methods: {
		async search() {
			if (!this.title && !this.tagNames.length) {
				return;
			}

			this.isSearching = true;
			this.confirm.isOpen = false;

			const { data } = await searchDevLinks({
				searchType: this.searchType,
				page: this.page,
				title: this.title || undefined,
				tagNames: this.tagNames.length ? this.tagNames : undefined
			});

			const { totalCount, devLinks } = data;
			this.totalCount = totalCount;
			this.devLinks = devLinks;

			if (!totalCount) {
				this.openMessage('검색 결과가 없습니다.', 'warning');
			}

			this.isSearching = false;
		},
		confirmRemoval(devLinkId) {
			if(!this.isSignIn) {
				this.openMessage('로그인이 필요합니다.', 'warning');
				return;
			}

			this.openConfirm('정말로 삭제하시겠습니까?');
			this.removeId = devLinkId;
		},
		async remove() {
			await removeDevLink(this.removeId);

			this.confirm.isOpen = false;
			this.openMessage('삭제됐습니다.');

			await this.search();
		},
		openAddModal() {
			if(!this.isSignIn) {
				this.openMessage('로그인이 필요합니다.', 'warning');
				return;
			}

			this.devLink = null;
			this.isModalOpen = true;
		},
		async openModifyModal(devLinkId) {
			if(!this.isSignIn) {
				this.openMessage('로그인이 필요합니다.', 'warning');
				return;
			}

			const { data } = await getDevLink(devLinkId);

			this.devLink = data;
			this.isModalOpen = true;
		},
		completeSave(newTagNames) {
			// 새롭게 등록된 태그가 있으면 추가
			if (newTagNames.length) {
				this.allTags = this.allTags.concat(newTagNames);
			}
			this.isModalOpen = false;
			this.openMessage('저장됐습니다.');
		},
		copyUrl(url) {
			this.$clipboard(url);
			this.openMessage('복사됐습니다.');
		},
		openMessage(text, color) {
			this.message.text = text;
			this.message.color = color || undefined;
			this.message.isOpen = true;
		},
		openConfirm(text, color) {
			this.confirm.text = text;
			this.confirm.color = color || undefined;
			this.confirm.isOpen = true;
		},
		clearAutoComplete() {
			this.autoCompleteInput = '';
			this.$refs.autocomplete.focus();
		},
		clearSearchInput() {
			if (this.searchType === 1) { // tag
				this.title = '';
			} else { // title
				this.tagNames = [];
			}
		}
	}
};
</script>
