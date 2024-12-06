export function convertDifficulty(difficultyNumber: number) {
    const difficultyMap = {
        1: '简单',
        2: '较易',
        3: '适中',
        4: '较难',
        5: '困难'
    };
    // 检查输入是否在有效范围内
    switch (difficultyNumber) {
        case 1: return difficultyMap[1];
        case 2: return difficultyMap[2];
        case 3: return difficultyMap[3];
        case 4: return difficultyMap[4];
        case 5: return difficultyMap[5];
        default: return "";
    }
}

export function convertWorkload(workloadNumber: number) {
    const workloadMap = {
        1: '很少',
        2: '较少',
        3: '适中',
        4: '较多',
        5: '很多'
    };
    // 检查输入是否在有效范围内
    switch (workloadNumber) {
        case 1: return workloadMap[1];
        case 2: return workloadMap[2];
        case 3: return workloadMap[3];
        case 4: return workloadMap[4];
        case 5: return workloadMap[5];
        default: return "";
    }
}

export function convertGrading(gradingNumber: number) {
    const gradingMap = {
        1: '很差',
        2: '较差',
        3: '中等',
        4: '较好',
        5: '很好'
    };
    // 检查输入是否在有效范围内
    switch (gradingNumber) {
        case 1: return gradingMap[1];
        case 2: return gradingMap[2];
        case 3: return gradingMap[3];
        case 4: return gradingMap[4];
        case 5: return gradingMap[5];
        default: return "";
    }
}

export function convertGain(gainNumber: number) {
    const gainMap = {
        1: '很小',
        2: '较小',
        3: '中等',
        4: '较大',
        5: '很大'
    };
    // 检查输入是否在有效范围内
    switch (gainNumber) {
        case 1: return gainMap[1];
        case 2: return gainMap[2];
        case 3: return gainMap[3];
        case 4: return gainMap[4];
        case 5: return gainMap[5];
        default: return "";
    }
}
