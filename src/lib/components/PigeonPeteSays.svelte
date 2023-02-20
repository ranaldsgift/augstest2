<style>
    
.speech-bubble {
    position: relative;
    padding: 1rem;
    border-radius: 0.75rem;
    box-shadow: -1px 1px 2px 0 black;
    max-width: calc(100% - 60px);
    align-self: center;
    justify-self: center;
}
.speech-bubble *:not(.unstyled) {
    color: rgba(var(--color-surface-900));
}
.speech-bubble::after {
    content: "";
    position: absolute;
    bottom: -20px;
    left: calc(50% + 30px);
    border-width: 20px 20px 0 0;
    border-style: solid;
    border-color: rgba(var(--color-tertiary-200)) transparent;
    display: block;
    width: 0;
    box-shadow: -3px 0px 0px -1px black;
}
:global(.dark) .speech-bubble::after {
    border-color: rgba(var(--color-tertiary-700)) transparent;
}
img {
    max-width: 300px;
}
</style>
<div class="flex flex-col justify-center text-center w-full items-center">
        <div class="speech-bubble mb-4 bg-tertiary-200-700-token">
            <slot></slot>
        </div>
        <img width="100%" class="-mt-2" src="/images/pigeonpete.png" alt="Pigeon Pete">
</div>