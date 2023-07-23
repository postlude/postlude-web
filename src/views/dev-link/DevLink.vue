<template>
	<v-container>
		<v-row>
			<v-col offset-lg="4" lg="3" offset="1" cols="6">
				<v-text-field label="검색" variant="outlined" required :clearable="true" v-model="searchWord" @keypress.enter="search" />
			</v-col>
			<v-col lg="1" cols="2">
				<v-btn color="info" class="mt-3" block :disabled="isSearching" @click="search">
					<v-icon>mdi-magnify</v-icon>
				</v-btn>
			</v-col>
			<v-col offset-lg="3" lg="1" cols="2">
				<v-btn color="success" class="mt-3" block :disabled="isSearching" @click="add">
					<v-icon>mdi-plus</v-icon>
				</v-btn>
			</v-col>
		</v-row>

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
				<v-btn color="green-lighten-1" :size="buttonSize" @click="modify(item.raw)">
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
			</template>
			<template v-slot:[`item.remove`]="{ item }">
				<v-btn color="red-lighten-1" :size="buttonSize" @click="openRemoveConfirm(item.raw.id)">
					<v-icon>mdi-delete</v-icon>
				</v-btn>
			</template>

			<template v-slot:bottom>
				<v-pagination v-model="page" :length="totalPageCount" />
				<!-- <v-pagination v-model="page" :length="totPageCnt" @input="srchDevLink(false)" /> -->
			</template>
		</v-data-table>

		<v-dialog v-model="isModalOpen" :width="modalSize" :close-delay="0" :open-delay="0">
			<dev-link-save :dev-link="devLink" @close="isModalOpen = false"/>
		</v-dialog>

		<message :is-open="message.isOpen" :text="message.text" :color="message.color" @close="message.isOpen = false" />
		<confirm :is-open="confirm.isOpen" :text="confirm.text" :color="confirm.color" @close="confirm.isOpen = false" @confirm="remove" />
	</v-container>
</template>

<script>
import DevLinkSave from './components/DevLinkSave.vue';
import Message from '@/components/Message.vue';
import Confirm from '@/components/Confirm.vue';
import { searchDevLinks, removeDevLink } from '@/util/api';

export default {
	name: 'DevLink',
	components: {
		Message,
		Confirm,
		DevLinkSave
	},
	data() {
		return {
			srchTagAry: [],
			srchTitle: '',
			tagList: [],

			searchWord: '',
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
		}
	},
	async mounted() {
		// try {
		// 	const { code, tagList } = await getTagList(TAG_TY.DEV_LINK);
		// 	if (code === RSPNS.SUCCES) {
		// 		this.tagList = tagList.map(({ tag }) => tag);
		// 	} else {
		// 		throw new Error(code);
		// 	}
		// } catch (err) {
		// 	console.error(err);
		// }
	},
	methods: {
		/**
		 * @description 개발 문서 검색
		 */
		// async srchDevLink(isSrch) {
		// 	try {
		// 		const isValidParam = this.chckParam();

		// 		if (isValidParam) {
		// 			this.isSrching = true;

		// 			if (isSrch) {
		// 				this.page = 1;
		// 			}

		// 			const { code, totCnt, devLinkList } = await getDevLinkList({
		// 				ty: this.srchTy,
		// 				page: this.page,
		// 				srchTitle: this.srchTitle,
		// 				srchTagAry: JSON.stringify(this.srchTagAry)
		// 			});

		// 			if (code === RSPNS.SUCCES) {
		// 				this.totalCount = totCnt;
		// 				this.devLinkList = devLinkList;
		// 			} else {
		// 				throw new Error(code);
		// 			}
		// 		} else {
		// 			this.$message({ type: 'warning', message: '입력 값을 확인해주세요.' });
		// 		}
		// 	} catch (err) {
		// 		console.error(err);
		// 		this.$message({ type: 'error', message: '에러가 발생했습니다.' });
		// 	} finally {
		// 		this.isSrching = false;
		// 	}
		// },
		// async rmDevLink(idx) {
		// 	try {
		// 		await this.$confirm('정말로 삭제하시겠습니까?', '링크 삭제', {
		// 			confirmButtonText: '삭제',
		// 			type: 'warning'
		// 		});

		// 		const { code } = await rmDevLink(idx);

		// 		if (code === RSPNS.SUCCES) {
		// 			this.$message({ type: 'success', message: '삭제되었습니다.' });
		// 		} else {
		// 			throw new Error(code);
		// 		}
		// 	} catch (err) {
		// 		if (err !== 'cancel') {
		// 			console.error(err);
		// 			this.$message({ type: 'error', message: '에러가 발생했습니다.' });
		// 		}
		// 	}
		// },
		async search() {
			const { data } = await searchDevLinks({
				page: this.page,
				tagName: this.searchWord
			});

			const { totalCount, devLinks } = data;
			this.totalCount = totalCount;
			this.devLinks = devLinks;

			this.message.isOpen = false;
			this.confirm.isOpen = false;
		},
		openRemoveConfirm(devLinkId) {
			this.openConfirm('정말로 삭제하시겠습니까?');
			this.removeId = devLinkId;
		},
		async remove() {
			await removeDevLink(this.removeId);

			this.confirm.isOpen = false;
			this.openMessage('삭제됐습니다.');

			await this.search();
		},
		add() {
			this.devLink = null;
			this.isModalOpen = true;
		},
		modify(devLink) {
			this.devLink = devLink;
			this.isModalOpen = true;
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
		}
	}
};
</script>
