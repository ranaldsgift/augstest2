<script lang="ts">
    export let listItems: { name: string, url: string }[];
</script>

<style>
    a.btn::before {
        background-image: url('/images/overlays/monochrome.jpg');
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: 121%;
        background-repeat: no-repeat;
        box-shadow: rgb(129 140 248 / 86%) 1px 1px 1px 38px inset;
        background-position: -13px -123px;
    }
    a.btn::after {
        position: absolute;
        content: attr(data-title);
        text-shadow: 2px 2px black;
        display: grid;
        align-content: center;
        left: 2rem;
        color: #ffffff;
    }
    a.btn:nth-child(2n+2)::after {
        justify-content: end;
        right: 2rem;
    }
    a.btn:nth-child(2n+2) {
        transform: perspective(100px) rotatey(-1deg);
    }
    a.btn {
        position: relative;
        transform: perspective(100px) rotatey(1deg);
        min-height: 48px;
    }
    .comic-list-nav {
        color: #ffffff;
    }
    .comic-list-nav a {
        width: 80%;
        border: 3px solid black;
        border-radius: 0;
        background-size: 121%;
        background-repeat: no-repeat;
        box-shadow: rgb(129 140 248 / 86%) 1px 1px 1px 38px inset;
        background-position: -13px -123px;
        text-align: left;
        justify-content: start;
        color: #00000000;
        text-transform: uppercase;
        font-size: 2rem;
        font-family: 'Badaboom';
        letter-spacing: 5px;
    }
    .comic-list-nav a:nth-child(2n+2) {
        justify-self: end;
    }
</style>

<div class="m-auto">
    <nav class="grid m-auto gap-4 px-8 max-w-7xl comic-list-nav">
        {#each listItems as listItem}
        <a href="{listItem.url}/" class="grid btn" data-title={listItem.name}>
        </a>
        {/each}
    </nav>
</div>