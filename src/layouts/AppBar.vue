<template>
	<v-app-bar flat>
		<v-app-bar-nav-icon variant="text" @click.stop="isOpenSideBar = !isOpenSideBar" />
		<v-toolbar-title>POSTLUDE</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-btn variant="text" icon="mdi-magnify"></v-btn>
	</v-app-bar>

	<v-navigation-drawer v-model="isOpenSideBar">
		<v-list :items="items"></v-list>
	</v-navigation-drawer>
</template>

<!-- <script lang="ts" setup>
let drawer = false;
const items = [
	{
		title: 'Foo',
		value: 'foo',
	},
	{
		title: 'Bar',
		value: 'bar',
	},
	{
		title: 'Fizz',
		value: 'fizz',
	},
	{
		title: 'Buzz',
		value: 'buzz',
	},
];
</script> -->

<script>
export default {
	data: () => ({
		isOpenSideBar: true,
		items: [
			{
				title: 'Foo',
				value: 'foo'
			},
			{
				title: 'Bar',
				value: 'bar'
			},
			{
				title: 'Fizz',
				value: 'fizz'
			},
			{
				title: 'Buzz',
				value: 'buzz'
			}
		]
	})
};
</script>