<template>
    <div class="dialog"  @click.stop="hideDialog">
        <div @click.stop class="dialog__content">
            <slot></slot>
        </div>

    </div>
</template>

<script >
export default {
    name: 'my-dialog',
    methods: {
        hideDialog() {
            this.$emit('update:show', false)
        }
    }
}
 

</script>

<style scoped>
.dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
}
.dialog__content {
    margin: auto;
    color: red;
    font-size: 20px;
    background: white;
    padding: 0 10px;
    border-radius: 12px;
    min-height: 80px;
    min-width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>