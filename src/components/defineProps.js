import { ref, onMounted } from "vue";
import { listSido, listGugun, listDong } from "@/api/map";

const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const sidoName = ref([]);
const sidoCode = ref([]);
const gugunName = ref([]);
const gugunCode = ref([]);
const dongName = ref([]);
const dongCode = ref([]);
const toggle = ref(true);
const toggleHandler = () => {
toggle.value = !toggle.value;
};
const getSidoList = () => {
listSido(
({ data }) => {
data.forEach((sido) => {
sidoName.value.push(sido.sidoName);
sidoCode.value.push(sido.sidoCode);
});
},
(err) => {
console.log(err);
}
);
};
const onChangeSido = (val) => {
const code = sidoCode.value[sidoName.value.indexOf(val)];

gugunName.value = [];
gugunCode.value = [];

listGugun(
code,
({ data }) => {
data.forEach((gugun) => {
gugunName.value.push(gugun.gugunName);
gugunCode.value.push(gugun.gugunCode);
});
},
(err) => {
console.log(err);
}
);
};
const onChangeGugun = (val) => {
const code = gugunCode.value[gugunName.value.indexOf(val)];

dongName.value = [];
dongCode.value = [];

listDong(
code,
({ data }) => {
data.forEach((dong) => {
dongName.value.push(dong.dongName);
dongCode.value.push(dong.dongCode);
});
},
(err) => {
console.log(err);
}
);
};
onMounted(() => {
getSidoList();
});
const __VLS_componentsOption = {};
let __VLS_name!: 'SearchCombo';
function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption;
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots; })>;
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
/* Style Scoped */
type __VLS_StyleScopedClasses = {};
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {} &
__VLS_WithComponent<'VSwitch', typeof __VLS_localComponents, "VSwitch", "vSwitch", "v-switch"> &
__VLS_WithComponent<'VCombobox', typeof __VLS_localComponents, "VCombobox", "vCombobox", "v-combobox"> &
__VLS_WithComponent<'VTextField', typeof __VLS_localComponents, "VTextField", "vTextField", "v-text-field">;
({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div;
__VLS_components.VSwitch; __VLS_components.VSwitch; __VLS_components.vSwitch; __VLS_components.vSwitch; __VLS_components["v-switch"]; __VLS_components["v-switch"];
// @ts-ignore
[VSwitch, VSwitch,];
__VLS_components.VCombobox; __VLS_components.VCombobox; __VLS_components.VCombobox; __VLS_components.VCombobox; __VLS_components.VCombobox; __VLS_components.VCombobox; __VLS_components.vCombobox; __VLS_components.vCombobox; __VLS_components.vCombobox; __VLS_components.vCombobox; __VLS_components.vCombobox; __VLS_components.vCombobox; __VLS_components["v-combobox"]; __VLS_components["v-combobox"]; __VLS_components["v-combobox"]; __VLS_components["v-combobox"]; __VLS_components["v-combobox"]; __VLS_components["v-combobox"];
// @ts-ignore
[VCombobox, VCombobox, VCombobox, VCombobox, VCombobox, VCombobox,];
__VLS_components.VTextField; __VLS_components.VTextField; __VLS_components.vTextField; __VLS_components.vTextField; __VLS_components["v-text-field"]; __VLS_components["v-text-field"];
// @ts-ignore
[VTextField, VTextField,];
({} as __VLS_IntrinsicElements).button; ({} as __VLS_IntrinsicElements).button;
{
const __VLS_0 = ({} as __VLS_IntrinsicElements)["div"];
const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
({} as __VLS_IntrinsicElements).div;
({} as __VLS_IntrinsicElements).div;
const __VLS_2 = __VLS_1({ ...{}, id: ("search"), class: ("h-16 rounded-full flex items-center justify-between px-3 gap-5 absolute"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{}, id: ("search"), class: ("h-16 rounded-full flex items-center justify-between px-3 gap-5 absolute"), });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
{
let __VLS_5!: 'VSwitch' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VSwitch : 'vSwitch' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vSwitch : 'v-switch' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-switch'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VSwitch'];
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({ ...{ onUpdate: {} as any, }, label: (""), inset: (true), class: ("pt-5 m-0"), }));
({} as { VSwitch: typeof __VLS_5; }).VSwitch;
({} as { VSwitch: typeof __VLS_5; }).VSwitch;
const __VLS_7 = __VLS_6({ ...{ onUpdate: {} as any, }, label: (""), inset: (true), class: ("pt-5 m-0"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{ onUpdate: {} as any, }, label: (""), inset: (true), class: ("pt-5 m-0"), });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
let __VLS_10 = { 'update': __VLS_pickEvent(__VLS_9['update'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_6, typeof __VLS_7>).onUpdate) };
__VLS_10 = {
update: (__VLS_ctx.toggleHandler)
};
}
if (__VLS_ctx.toggle) {
{
const __VLS_11 = ({} as __VLS_IntrinsicElements)["div"];
const __VLS_12 = __VLS_elementAsFunctionalComponent(__VLS_11);
({} as __VLS_IntrinsicElements).div;
({} as __VLS_IntrinsicElements).div;
const __VLS_13 = __VLS_12({ ...{}, class: ("px-4 pt-4 flex justify-center items-center gap-6 w-full"), }, ...__VLS_functionalComponentArgsRest(__VLS_12));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_11, typeof __VLS_13> & Record<string, unknown>) => void)({ ...{}, class: ("px-4 pt-4 flex justify-center items-center gap-6 w-full"), });
const __VLS_14 = __VLS_pickFunctionalComponentCtx(__VLS_11, __VLS_13)!;
let __VLS_15!: __VLS_NormalizeEmits<typeof __VLS_14.emit>;
{
let __VLS_16!: 'VCombobox' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VCombobox : 'vCombobox' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vCombobox : 'v-combobox' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-combobox'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VCombobox'];
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({ ...{ "onUpdate:modelValue": {} as any, }, class: ("w-1/3"), items: ((__VLS_ctx.sidoName)), variant: ("underlined"), label: ("시•도"), }));
({} as { VCombobox: typeof __VLS_16; }).VCombobox;
({} as { VCombobox: typeof __VLS_16; }).VCombobox;
const __VLS_18 = __VLS_17({ ...{ "onUpdate:modelValue": {} as any, }, class: ("w-1/3"), items: ((__VLS_ctx.sidoName)), variant: ("underlined"), label: ("시•도"), }, ...__VLS_functionalComponentArgsRest(__VLS_17));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_16, typeof __VLS_18> & Record<string, unknown>) => void)({ ...{ "onUpdate:modelValue": {} as any, }, class: ("w-1/3"), items: ((__VLS_ctx.sidoName)), variant: ("underlined"), label: ("시•도"), });
const __VLS_19 = __VLS_pickFunctionalComponentCtx(__VLS_16, __VLS_18)!;
let __VLS_20!: __VLS_NormalizeEmits<typeof __VLS_19.emit>;
let __VLS_21 = { 'update:model-value': __VLS_pickEvent(__VLS_20['update:model-value'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_17, typeof __VLS_18>)["onUpdate:modelValue"]) };
__VLS_21 = {
"update:model-value": $event => {
if (!((__VLS_ctx.toggle))) return;
__VLS_ctx.onChangeSido($event);
}
};
}
{
let __VLS_22!: 'VCombobox' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VCombobox : 'vCombobox' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vCombobox : 'v-combobox' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-combobox'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VCombobox'];
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({ ...{ "onUpdate:modelValue": {} as any, }, class: ("w-1/3"), items: ((__VLS_ctx.gugunName)), variant: ("underlined"), label: ("구•군"), }));
({} as { VCombobox: typeof __VLS_22; }).VCombobox;
({} as { VCombobox: typeof __VLS_22; }).VCombobox;
const __VLS_24 = __VLS_23({ ...{ "onUpdate:modelValue": {} as any, }, class: ("w-1/3"), items: ((__VLS_ctx.gugunName)), variant: ("underlined"), label: ("구•군"), }, ...__VLS_functionalComponentArgsRest(__VLS_23));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_22, typeof __VLS_24> & Record<string, unknown>) => void)({ ...{ "onUpdate:modelValue": {} as any, }, class: ("w-1/3"), items: ((__VLS_ctx.gugunName)), variant: ("underlined"), label: ("구•군"), });
const __VLS_25 = __VLS_pickFunctionalComponentCtx(__VLS_22, __VLS_24)!;
let __VLS_26!: __VLS_NormalizeEmits<typeof __VLS_25.emit>;
let __VLS_27 = { 'update:model-value': __VLS_pickEvent(__VLS_26['update:model-value'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_23, typeof __VLS_24>)["onUpdate:modelValue"]) };
__VLS_27 = {
"update:model-value": $event => {
if (!((__VLS_ctx.toggle))) return;
__VLS_ctx.onChangeGugun($event);
}
};
}
{
let __VLS_28!: 'VCombobox' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VCombobox : 'vCombobox' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vCombobox : 'v-combobox' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-combobox'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VCombobox'];
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({ ...{}, class: ("w-1/3"), items: ((__VLS_ctx.dongName)), variant: ("underlined"), label: ("동"), }));
({} as { VCombobox: typeof __VLS_28; }).VCombobox;
({} as { VCombobox: typeof __VLS_28; }).VCombobox;
const __VLS_30 = __VLS_29({ ...{}, class: ("w-1/3"), items: ((__VLS_ctx.dongName)), variant: ("underlined"), label: ("동"), }, ...__VLS_functionalComponentArgsRest(__VLS_29));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_28, typeof __VLS_30> & Record<string, unknown>) => void)({ ...{}, class: ("w-1/3"), items: ((__VLS_ctx.dongName)), variant: ("underlined"), label: ("동"), });
const __VLS_31 = __VLS_pickFunctionalComponentCtx(__VLS_28, __VLS_30)!;
let __VLS_32!: __VLS_NormalizeEmits<typeof __VLS_31.emit>;
}
(__VLS_14.slots!).default;
}
// @ts-ignore
[toggleHandler, toggle, sidoName, sidoName, sidoName, onChangeSido, gugunName, gugunName, gugunName, onChangeGugun, dongName, dongName, dongName,];
}
else {
{
const __VLS_33 = ({} as __VLS_IntrinsicElements)["div"];
const __VLS_34 = __VLS_elementAsFunctionalComponent(__VLS_33);
({} as __VLS_IntrinsicElements).div;
({} as __VLS_IntrinsicElements).div;
const __VLS_35 = __VLS_34({ ...{}, class: ("pt-4 px-4 flex justify-center items-center w-full"), }, ...__VLS_functionalComponentArgsRest(__VLS_34));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_33, typeof __VLS_35> & Record<string, unknown>) => void)({ ...{}, class: ("pt-4 px-4 flex justify-center items-center w-full"), });
const __VLS_36 = __VLS_pickFunctionalComponentCtx(__VLS_33, __VLS_35)!;
let __VLS_37!: __VLS_NormalizeEmits<typeof __VLS_36.emit>;
{
let __VLS_38!: 'VTextField' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VTextField : 'vTextField' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vTextField : 'v-text-field' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-text-field'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VTextField'];
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({ ...{}, label: ("아파트명으로 검색하기"), variant: ("underlined"), class: ("w-4/5"), }));
({} as { VTextField: typeof __VLS_38; }).VTextField;
({} as { VTextField: typeof __VLS_38; }).VTextField;
const __VLS_40 = __VLS_39({ ...{}, label: ("아파트명으로 검색하기"), variant: ("underlined"), class: ("w-4/5"), }, ...__VLS_functionalComponentArgsRest(__VLS_39));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_38, typeof __VLS_40> & Record<string, unknown>) => void)({ ...{}, label: ("아파트명으로 검색하기"), variant: ("underlined"), class: ("w-4/5"), });
const __VLS_41 = __VLS_pickFunctionalComponentCtx(__VLS_38, __VLS_40)!;
let __VLS_42!: __VLS_NormalizeEmits<typeof __VLS_41.emit>;
}
(__VLS_36.slots!).default;
}
}
{
const __VLS_43 = ({} as __VLS_IntrinsicElements)["button"];
const __VLS_44 = __VLS_elementAsFunctionalComponent(__VLS_43);
({} as __VLS_IntrinsicElements).button;
({} as __VLS_IntrinsicElements).button;
const __VLS_45 = __VLS_44({ ...{}, class: ("bg-white rounded-3xl px-8 py-1 h-12 hover:bg-black"), }, ...__VLS_functionalComponentArgsRest(__VLS_44));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_43, typeof __VLS_45> & Record<string, unknown>) => void)({ ...{}, class: ("bg-white rounded-3xl px-8 py-1 h-12 hover:bg-black"), });
const __VLS_46 = __VLS_pickFunctionalComponentCtx(__VLS_43, __VLS_45)!;
let __VLS_47!: __VLS_NormalizeEmits<typeof __VLS_46.emit>;
(__VLS_46.slots!).default;
}
(__VLS_3.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
__VLS_styleScopedClasses["h-16"];
__VLS_styleScopedClasses["rounded-full"];
__VLS_styleScopedClasses["flex"];
__VLS_styleScopedClasses["items-center"];
__VLS_styleScopedClasses["justify-between"];
__VLS_styleScopedClasses["px-3"];
__VLS_styleScopedClasses["gap-5"];
__VLS_styleScopedClasses["absolute"];
__VLS_styleScopedClasses["pt-5"];
__VLS_styleScopedClasses["m-0"];
__VLS_styleScopedClasses["px-4"];
__VLS_styleScopedClasses["pt-4"];
__VLS_styleScopedClasses["flex"];
__VLS_styleScopedClasses["justify-center"];
__VLS_styleScopedClasses["items-center"];
__VLS_styleScopedClasses["gap-6"];
__VLS_styleScopedClasses["w-full"];
__VLS_styleScopedClasses["w-1/3"];
__VLS_styleScopedClasses["w-1/3"];
__VLS_styleScopedClasses["w-1/3"];
__VLS_styleScopedClasses["pt-4"];
__VLS_styleScopedClasses["px-4"];
__VLS_styleScopedClasses["flex"];
__VLS_styleScopedClasses["justify-center"];
__VLS_styleScopedClasses["items-center"];
__VLS_styleScopedClasses["w-full"];
__VLS_styleScopedClasses["w-4/5"];
__VLS_styleScopedClasses["bg-white"];
__VLS_styleScopedClasses["rounded-3xl"];
__VLS_styleScopedClasses["px-8"];
__VLS_styleScopedClasses["py-1"];
__VLS_styleScopedClasses["h-12"];
__VLS_styleScopedClasses["hover:bg-black"];
}
var __VLS_slots!: {};
return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
setup() {
return {
sidoName: sidoName as typeof sidoName,
gugunName: gugunName as typeof gugunName,
dongName: dongName as typeof dongName,
toggle: toggle as typeof toggle,
toggleHandler: toggleHandler as typeof toggleHandler,
onChangeSido: onChangeSido as typeof onChangeSido,
onChangeGugun: onChangeGugun as typeof onChangeGugun,
};
},
});
export default (await import('vue')).defineComponent({
setup() {
return {};
},
});
