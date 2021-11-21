<script>
    import { someText, anObject, aCompressedObject } from './store';
    import BigText from './BigText.svelte';

    const modifyObject = () => {
        $anObject = {
            a: $anObject.a + 1,
            b: !$anObject.b,
            c: $anObject.c.split('').reverse().join(''),
        };

        $aCompressedObject = {
            a: $aCompressedObject.a + 1,
            b: !$aCompressedObject.b,
            c: $aCompressedObject.c.split('').reverse().join(''),
        };
    };
</script>

<input
    type="text"
    bind:value={$someText}
/>

<button
    type="button"
    on:click={modifyObject}
>modify object</button>

<pre>
{JSON.stringify($anObject, null, ' ')}
{JSON.stringify($aCompressedObject, null, ' ')}
</pre>

<BigText />
