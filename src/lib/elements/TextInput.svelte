<script lang="ts">
  import warning from '$lib/icons/warning'

  type InputType = 'text' | 'number' | 'textarea' | 'password' | 'email'

  export let type: InputType = 'text'
  export let value: string | number
  export let label = ''
  export let name: string
  export let invalid = ''
  export let placeholder = ''
  export let hint = ''
  export let width = '100%'
  export let disabled = false
  export let readonly = false
  export let rows = 1
  export let maxlength = 1000
  export let cursorPointer = false
  export let micro = false

  export const focus = () => input && input.focus()
  export const blur = () => input && input.blur()
  export const select = () => input && input.select()

  let input: HTMLInputElement | HTMLTextAreaElement

  $: styles = `flex items-center bg-transparent placeholder:text-neutral-400 w-full autofill:bg-transparent font-medium ${
    micro ? 'px-3 py-2' : 'px-4 py-[14px]'
  } border border-neutral-200 dark:border-neutral-600 rounded appearance-none focus:outline-none ${
    micro ? 'focus:ring-2' : 'focus:ring'
  } focus:border-white ${invalid ? 'focus:ring-utility-error' : 'focus:ring-purple-500'} ${
    cursorPointer ? 'cursor-pointer' : ''
  }`
</script>

<div style="width: {width};" class="flex flex-col relative">
  {#if label}
    <label class="{micro ? 'text-xs' : 'text-sm'} w-1/2 text-inherit font-medium mb-2" for={name}
      >{label}</label
    >
  {/if}

  <div class="relative flex items-center">
    {#if hint}
      <span
        class="flex justify-end absolute right-1 -top-6 text-neutral-400 text-xs w-1/2 cursor-default font-medium"
        >{@html hint}</span
      >
    {/if}

    {#if type === 'text'}
      <input
        bind:this={input}
        on:blur
        on:input
        on:focus
        {readonly}
        {name}
        {placeholder}
        {disabled}
        class={styles}
        type="text"
        bind:value
      />
    {:else if type === 'number'}
      <input
        bind:this={input}
        on:blur
        on:input
        on:focus
        {readonly}
        {name}
        {placeholder}
        {disabled}
        class={styles}
        type="number"
        inputmode="numeric"
        pattern="\d*"
        bind:value
      />
    {:else if type === 'textarea'}
      <textarea
        bind:this={input}
        on:blur
        on:input
        on:focus
        {readonly}
        {name}
        {placeholder}
        {disabled}
        class={styles}
        {rows}
        {maxlength}
        bind:value
      />
    {:else if type === 'email'}
      <input
        bind:this={input}
        on:blur
        on:input
        on:focus
        {readonly}
        {name}
        {placeholder}
        {disabled}
        class={styles}
        type="email"
        bind:value
      />
    {:else}
      <input
        bind:this={input}
        on:blur
        on:input
        on:focus
        {readonly}
        {name}
        {placeholder}
        {disabled}
        class={styles}
        type="password"
        bind:value
      />
    {/if}

    <slot />
  </div>

  <div
    class="flex items-center transition-all overflow-hidden text-utility-error {invalid
      ? 'h-8'
      : 'h-0'}"
  >
    <span class="w-4 mr-2">{@html warning}</span>
    <span class="text-xs font-medium">{invalid}</span>
  </div>
</div>
