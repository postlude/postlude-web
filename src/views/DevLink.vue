<template>
	<!-- <v-data-table :headers="headers" :items="devLinks" items-per-page="10" item-value="id"> -->

	<!-- <template v-slot:[`item.copy`]="{ item }">
			<v-btn color="grey darken-1" :x-small="isPhone" @click="cpLink(item.url)">
				<v-icon :small="isPhone">
					link
				</v-icon>
			</v-btn>
		</template> -->
	<!-- <template v-slot:[`item.mdfy`]="{ item }">
			<v-btn color="success" :x-small="isPhone" @click="openModal(item.idx)">
				<v-icon :small="isPhone">
					create
				</v-icon>
			</v-btn>
		</template> -->
	<!-- <template v-slot:[`item.rm`]="{ item }">
			<v-btn color="error" :x-small="isPhone" @click="rmDevLink(item.idx)">
				<v-icon :small="isPhone">
					delete
				</v-icon>
			</v-btn>
		</template> -->
	<!-- </v-data-table> -->

	<v-data-table :headers="headers" :items="devLinks">
		<template v-slot:[`item.title`]="{ item }">
			<a :href="item.raw.url" target="_blank">{{ item.raw.title }}</a>
		</template>

		<template v-slot:[`item.copy`]="{ item }">
			<v-btn color="grey darken-1" :size="buttonSize" @click="copyLink(item.raw.url)">
				<v-icon>mdi-link</v-icon>
			</v-btn>
		</template>
		<template v-slot:[`item.modify`]="{ item }">
			<v-btn color="green-lighten-1" :size="buttonSize" @click="copyLink(item.raw.url)">
				<v-icon>mdi-pencil</v-icon>
			</v-btn>
		</template>
		<template v-slot:[`item.remove`]="{ item }">
			<v-btn color="red-lighten-1" :size="buttonSize" @click="copyLink(item.raw.url)">
				<v-icon>mdi-delete</v-icon>
			</v-btn>
		</template>

		<template v-slot:bottom>
			<v-pagination v-model="page" :length="totalPageCount" />
		</template>
	</v-data-table>

	<!-- <v-list lines="one">
		<v-list-item v-for="item in devLinks" :key="item.title" :title="item.title" subtitle="..."></v-list-item>
	</v-list> -->

	<!-- <v-table density="compact">
		<thead>
			<tr>
				<th class="text-center">
					개발 링크
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="item in devLinks" :key="item.id">
				<td>{{ item.title }}</td>
			</tr>
		</tbody>
	</v-table> -->

	<!-- <v-pagination v-model="page" :length="totPageCnt" @input="srchDevLink(false)" /> -->
	<message :is-open="message.isOpen" :text="message.text" :color="message.color" @close="message.isOpen = false" />
</template>

<script>
// import DevLinkModal from '@/components/dev-link/DevLinkModal.vue';
// import { getDevLinkList, rmDevLink, getDevLink } from '@/api/devLink';
// import { getTagList } from '@/api/tag';
import Message from '@/components/Message.vue';

export default {
	name: 'DevLink',
	components: {
		Message
	},
	data() {
		return {
			srchTy: 1,
			srchTyList: [
				{ text: '태그', value: 1 },
				{ text: '제목', value: 2 }
			],
			srchTagAry: [],
			srchTitle: '',
			page: 1,
			isSrching: false,
			// headers: [
			// 	{ text: '링크', value: 'title', align: 'center' },
			// 	{ text: '복사', value: 'copy', align: 'center' },
			// 	{ text: '수정', value: 'mdfy', align: 'center' },
			// 	{ text: '삭제', value: 'rm', align: 'center' }
			// ],
			// headers: [
			// 	{ title: '링크', align: 'center', key: 'id' },
			// ],
			devLinkList: [],

			isModalOpen: false,
			devLink: {},
			tagAry: [],
			tagSet: null,
			tagList: [],




			message: {
				isOpen: false,
				text: '',
				color: undefined
			},
			headers: [
				{
					title: 'title',
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
			totalCount: 4,
			devLinks: [
				{
					id: 1,
					title: 'title1',
					url: 'https://www.naver.com'
				},
				{
					id: 2,
					title: 'title2',
					url: 'https://www.naver.com'
				},
				{
					id: 3,
					title: 'title3',
					url: 'https://www.naver.com'
				},
				{
					id: 4,
					title: 'title4',
					url: 'https://www.naver.com'
				},
				{
					id: 5,
					title: 'title5',
					url: 'https://www.naver.com'
				}
			]
		};
	},
	computed: {
		totalPageCount() {
			return Math.ceil(this.totalCount / 3);
		},
		isPhone() {
			// return this.$store.getters.isPhone;
			return false;
		},
		buttonSize() {
			return this.$isMobile() ? 'x-small' : 'default';
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
		// chckParam() {
		// 	if (this.srchTy === 1) { // 태그 검색
		// 		if (this.srchTagAry.length) {
		// 			return true;
		// 		} else {
		// 			return false;
		// 		}
		// 	} else if (this.srchTitle.length > 2) { // 제목 검색
		// 		return true;
		// 	} else {
		// 		return false;
		// 	}
		// }
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
		// async openModal(idx) {
		// 	try {
		// 		const { code, devLink, tagAry } = await getDevLink(idx);

		// 		if (code === RSPNS.SUCCES) {
		// 			this.devLink = devLink;
		// 			this.tagAry = tagAry;
		// 			this.tagSet = new Set(tagAry);
		// 			this.isModalOpen = true;
		// 		} else {
		// 			throw new Error(code);
		// 		}
		// 	} catch (err) {
		// 		console.error(err);
		// 		this.$message({ type: 'error', message: '에러가 발생했습니다.' });
		// 	}
		// },
		copyLink(url) {
			this.$clipboard(url);
			this.openMessage('복사됐습니다.');
		},
		openMessage(text, color) {
			this.message.text = text;
			this.message.color = color || undefined;
			this.message.isOpen = true;
		}
	}
};
</script>
