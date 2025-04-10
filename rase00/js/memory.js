let memory = 0;

export function memoryClear() {
    memory = 0;
    return 'Memory cleared';
}

export function memoryRecall() {
    return memory;
}

export function memoryAdd(value) {
    memory += value;
    return `M+ ${value}`;
}

export function memorySubtract(value) {
    memory -= value;
    return `M- ${value}`;
}
