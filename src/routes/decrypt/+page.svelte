<script lang="ts">
  import { fade } from 'svelte/transition'
  import { goto } from '$app/navigation'
  import PinEntry from '$lib/components/PinEntry.svelte'
  import { AUTH_STORAGE_KEY } from '$lib/constants'
  import lightning from '$lib/lightning'
  import { translate } from '$lib/i18n/translations'
  import { auth$, customNotifications$, lastPath$, pin$ } from '$lib/streams'
  import { createRandomHex, getDataFromStorage, parseStoredAuth } from '$lib/utils'

  let pin: string
  let reset: () => void

  const storedAuth = getDataFromStorage(AUTH_STORAGE_KEY)

  function handlePinEntry() {
    pin$.next(pin)
    // try and decrypt auth with pin
    const auth = storedAuth && parseStoredAuth(storedAuth, pin)

    if (auth) {
      auth$.next(auth)
      lightning.initialiseData()
      goto($lastPath$)
    } else {
      customNotifications$.next({
        id: createRandomHex(),
        type: 'error',
        heading: 'Decryption Error',
        message: 'Incorrect pin number'
      })

      reset()
    }
  }
</script>

<svelte:head>
  <title>{$translate('app.titles./decrypt')}</title>
</svelte:head>

<section
  in:fade|local={{ duration: 250 }}
  class="flex flex-col justify-center items-start w-full h-full p-4 max-w-lg"
>
  <div class="mb-6">
    <h1 class="text-4xl font-bold mb-4">{$translate('app.headings.decrypt')}</h1>
    <p class="text-neutral-600 dark:text-neutral-300 ">
      {$translate('app.subheadings.decrypt')}
    </p>
  </div>

  <div class="flex justify-center w-full mt-6">
    <PinEntry bind:pin bind:reset on:complete={handlePinEntry} />
  </div>
</section>
