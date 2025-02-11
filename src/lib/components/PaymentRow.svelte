<script lang="ts">
  import { fade } from 'svelte/transition'
  import { goto } from '$app/navigation'
  import type { Payment } from '$lib/types'
  import { settings$ } from '$lib/streams'
  import { BitcoinDenomination } from '$lib/types'
  import { formatValueForDisplay, formatDate } from '$lib/utils'
  import { convertValue } from '$lib/conversion'
  import { translate } from '$lib/i18n/translations'
  import lightning from '$lib/icons/lightning'
  import clock from '$lib/icons/clock'
  import close from '$lib/icons/close'
  import { currencySymbols } from '$lib/constants'
  import Spinner from '$lib/elements/Spinner.svelte'

  export let payment: Payment

  const { id, direction, value, startedAt, completedAt, description, status } = payment

  $: primaryValue = convertValue({
    from: BitcoinDenomination.msats,
    to: $settings$.primaryDenomination,
    value
  })

  $: secondaryValue = convertValue({
    from: BitcoinDenomination.msats,
    to: $settings$.secondaryDenomination,
    value
  })

  $: abs = payment.status === 'complete' ? (payment.direction === 'receive' ? '+' : '-') : ''

  const primarySymbol = currencySymbols[$settings$.primaryDenomination]
  const secondarySymbol = currencySymbols[$settings$.secondaryDenomination]
</script>

<button
  in:fade|local={{ duration: 250 }}
  on:click={() => goto(`/payments/${id}`)}
  class="flex items-start text-start justify-between py-4 border-t w-full cursor-pointer dark:hover:bg-neutral-800/40 hover:bg-neutral-50/50 transition-all"
>
  <div class="flex items-start w-3/5">
    <div
      class="border rounded-full w-8 mr-2 {direction === 'receive' && status === 'complete'
        ? 'border-utility-success text-utility-success'
        : status === 'pending'
        ? 'border-utility-pending text-utility-pending'
        : status === 'expired' || status === 'failed'
        ? 'border-utility-error text-utility-error'
        : 'border-current'} font-bold flex-shrink-0"
    >
      {#if status === 'complete'}
        {@html lightning}
      {:else if status === 'pending'}
        {@html clock}
      {:else}
        {@html close}
      {/if}
    </div>
    <div class="flex flex-col w-full">
      <span class="font-bold">{$translate('app.payment.status', { direction, status })}</span>

      {#if description}
        <span class="text-sm italic text-neutral-500 mt-1 break-words">{description}</span>
      {/if}

      <span class="text-sm text-neutral-400 mt-1">
        {#await formatDate( { date: completedAt || startedAt, language: $settings$.language } ) then formatted}
          <span in:fade|local={{ duration: 50 }}>{formatted}</span>
        {/await}
      </span>
    </div>
  </div>

  <div class="flex flex-col items-end w-2/5">
    <p class="font-bold flex items-center">
      {abs}
      <span
        class="flex justify-center items-center"
        class:w-4={primarySymbol.startsWith('<')}
        class:mr-[2px]={!primarySymbol.startsWith('<')}
      >
        {@html primarySymbol}
      </span>
      {#if primaryValue}
        {formatValueForDisplay({
          denomination: $settings$.primaryDenomination,
          value: primaryValue,
          commas: true
        })}
      {:else}
        <div class="ml-1">
          <Spinner size="1rem" />
        </div>
      {/if}
    </p>
    <p class="text-neutral-400 flex items-center">
      {abs}
      <span
        class="flex justify-center items-center"
        class:w-4={secondarySymbol.startsWith('<')}
        class:mr-[2px]={!secondarySymbol.startsWith('<')}
      >
        {@html secondarySymbol}
      </span>
      {#if secondaryValue}
        {formatValueForDisplay({
          denomination: $settings$.secondaryDenomination,
          value: secondaryValue,
          commas: true
        })}
      {:else}
        <div class="ml-1">
          <Spinner size="1rem" />
        </div>
      {/if}
    </p>
  </div>
</button>
