/**********************/
/* 入力データサンプル */
/**********************/
// rankTable:役職ランクテーブル
const rankTable = [
	{'pos':'M',   'rank': 1,  'cor': false},
	{'pos':'FSN', 'rank': 3,  'cor': true},
	{'pos':'SN',  'rank': 5,  'cor': true},
	{'pos':'KD',  'rank': 7,  'cor': true},
	{'pos':'CHD', 'rank': 7,  'cor': true},
	{'pos':'TTK', 'rank': 9,  'cor': true},
	{'pos':'K',   'rank': 11, 'cor': false},
	{'pos':'CH',  'rank': 11, 'cor': false},
	{'pos':'TTJ', 'rank': 13, 'cor': false},
	{'pos':'J',   'rank': 13, 'cor': false},
	{'pos':'TTB', 'rank': 15, 'cor': false},
	{'pos':'BB',  'rank': 15, 'cor': false},
	{'pos':'B',   'rank': 17, 'cor': false},
	{'pos':'SH',  'rank': 17, 'cor': false}
];

// courseTable:採用コースランクテーブル
const courseTable = [
	{'course':'global', 'rank': 1},
	{'course':'area',   'rank': 0}
];

// maxRate:最大倍率
const maxRate = 2.0;

// payment:支払総額
const payment = 51374;

// attendTable:参加者テーブル
const attendTable = [
	{'no': 1,  'name':'佐藤', 'pos':'FSN', 'course':'area',   'guest':false, 'round':false, 'organizer':false, 'adjustFee':0},
	{'no': 2,  'name':'鈴木', 'pos':'FSN', 'course':'area',   'guest':false, 'round':false, 'organizer':true,  'adjustFee':0},
	{'no': 3,  'name':'高橋', 'pos':'FSN', 'course':'global', 'guest':false, 'round':true,  'organizer':false, 'adjustFee':0},
	{'no': 4,  'name':'田中', 'pos':'SN',  'course':'area',   'guest':false, 'round':false, 'organizer':false, 'adjustFee':5000},
	{'no': 5,  'name':'伊藤', 'pos':'SN',  'course':'global', 'guest':false, 'round':true,  'organizer':false, 'adjustFee':0},
	{'no': 6,  'name':'渡辺', 'pos':'KD',  'course':'area',   'guest':false, 'round':false, 'organizer':false, 'adjustFee':0},
	{'no': 7,  'name':'山本', 'pos':'KD',  'course':'global', 'guest':true,  'round':false, 'organizer':false, 'adjustFee':0},
	{'no': 8,  'name':'中村', 'pos':'KD',  'course':'global', 'guest':false, 'round':true,  'organizer':false, 'adjustFee':0},
	{'no': 9,  'name':'小林', 'pos':'TTK', 'course':'area',   'guest':false, 'round':false, 'organizer':false, 'adjustFee':0},
	{'no': 10, 'name':'加藤', 'pos':'K',   'course':'area',   'guest':false, 'round':false, 'organizer':false, 'adjustFee':0},
	{'no': 11, 'name':'吉田', 'pos':'K',   'course':'global', 'guest':false, 'round':false, 'organizer':false, 'adjustFee':0},
	{'no': 12, 'name':'山田', 'pos':'B',   'course':'global', 'guest':false, 'round':false, 'organizer':false, 'adjustFee':0}
];
