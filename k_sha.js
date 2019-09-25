function k_sha(rankTable, courseTable, maxRate, payment, attendTable) {

	// 受け渡された参加者テーブル(attendTable)に要素を付加しつつ処理を進め
	// 中間値や計算結果等の要素を追加した参加者テーブルを丸ごと返却する

	/********************/
	/* 0.入力値チェック */
	/********************/
	// 画面側で実施しつつ処理内でも実施する想定

	// ランクテーブルのチェック
	if (rankTable === undefined || rankTable.length == 0) {
		let err = '[ERROR]役職ランクテーブル > 入力テーブルが不正';
		console.log(err);
		return [{'ERROR': err}];
	}
	for(let i = 0; i < rankTable.length; i++) {
		if(isNaN(rankTable[i].rank)) {
			let err = '[ERROR]役職ランクテーブル > No.' + (i + 1) + ':ランクの値が不正';
			console.log(err);
			return [{'ERROR': err}];
		} else {
			rankTable[i].rank = Number(rankTable[i].rank);
		}
		if(rankTable[i].rank < 1 || Number.isInteger(rankTable[i].rank) == false) {
			let err = '[ERROR]役職ランクテーブル > No.' + (i + 1) + ':ランクの値が不正';
			console.log(err);
			return [{'ERROR': err}];
		}
	}

	// 採用コーステーブルのチェック
	if (courseTable === undefined || courseTable.length == 0) {
		let err = '[ERROR]採用コーステーブル > 入力テーブルが不正';
		console.log(err);
		return [{'ERROR': err}];
	}
	for(let i = 0; i < courseTable.length; i++) {
		if(isNaN(courseTable[i].rank)) {
			let err = '[ERROR]採用コーステーブル > No.' + (i + 1) + ':ランクの値が不正';
			console.log(err);
			return [{'ERROR': err}];
		} else {
			courseTable[i].rank = Number(courseTable[i].rank);
		}
		if(courseTable[i].rank < 0 || Number.isInteger(courseTable[i].rank) == false) {
			let err = '[ERROR]採用コーステーブル > No.' + (i + 1) + ':ランクの値が不正';
			console.log(err);
			return [{'ERROR': err}];
		}
	}

	// 支払総額チェック(数字、1以上、整数)
	if(isNaN(payment)) {
		let err = '[ERROR]支払総額 > 値が不正';
		console.log(err);
		return [{'ERROR': err}];
	} else {
		payment = Number(payment);
	}
	if(payment < 1 || Number.isInteger(payment) == false) {
		let err = '[ERROR]支払総額 > 値が不正';
		console.log(err);
		return [{'ERROR': err}];
	}

	// 最大倍率チェック(数字、1以上)
	if(isNaN(maxRate)) {
		let err = '[ERROR]最大倍率 > 値が不正';
		console.log(err);
		return [{'ERROR': err}];
	} else {
		maxRate = Number(maxRate);
	}
	if(typeof maxRate != 'number' || maxRate < 1) {
		let err = '[ERROR]最大倍率 > 値が不正';
		console.log(err);
		return [{'ERROR': err}];
	}

	// 参加者テーブルのチェック
	if (attendTable === undefined || attendTable.length == 0) {
		let err = '[ERROR]参加者テーブル > 入力テーブルが不正';
		console.log(err);
		return [{'ERROR': err}];
	}
	let countOrganizer = 0;
	for(let i = 0; i < attendTable.length; i++) {
		if(isNaN(attendTable[i].no)) {
			let err = '[ERROR]参加者テーブル No.' + (i + 1) + ':Noの値が不正';
			console.log(err);
			return [{'ERROR': err}];
		} else {
			attendTable[i].no = Number(attendTable[i].no);
		}
		if(typeof attendTable[i].guest != 'boolean') {
			let err = '[ERROR]参加者テーブル > No.' + (i + 1) + ':ゲストの値が不正';
			console.log(err);
			return [{'ERROR': err}];
		}
		if(typeof attendTable[i].round != 'boolean') {
			let err = '[ERROR]参加者テーブル > No.' + (i + 1) + ':四捨五入の値が不正';
			console.log(err);
			return [{'ERROR': err}];
		}
		if(typeof attendTable[i].organizer != 'boolean') {
			let err = '[ERROR]参加者テーブル > No.' + (i + 1) + ':幹事の値が不正';
			console.log(err);
			return [{'ERROR': err}];
		}
		if(isNaN(attendTable[i].adjustFee)) {
			let err = '[ERROR]参加者テーブル > No.' + (i + 1) + ':調整金額の値が不正';
			console.log(err);
			return [{'ERROR': err}];
		} else {
			attendTable[i].adjustFee = Number(attendTable[i].adjustFee);
		}
		if(attendTable[i].adjustFee < 0) {
			let err = '[ERROR]参加者テーブル > No.' + (i + 1) + ':調整金額の値が不正';
			console.log(err);
			return [{'ERROR': err}];
		}
		if(attendTable[i].organizer && (attendTable[i].guest || attendTable[i].round || attendTable[i].adjustFee > 0)) {
			let err = '[ERROR]参加者テーブル > No.' + (i + 1) + ':幹事でゲスト、500円四捨五入、調整金額の入力は不可';
			console.log(err);
			return [{'ERROR': err}];
		}
		if(attendTable[i].guest && (attendTable[i].round || attendTable[i].adjustFee > 0)) {
			let err = '[ERROR]参加者テーブル > No.' + (i + 1) + ':ゲストで500円四捨五入、調整金額の入力は不可';
			console.log(err);
			return [{'ERROR': err}];
		}
		if(attendTable[i].round && attendTable[i].adjustFee > 0) {
			let err = '[ERROR]参加者テーブル > No.' + (i + 1) + ':500円四捨五入で調整金額の入力は不可';
			console.log(err);
			return [{'ERROR': err}];
		}
		if(attendTable[i].organizer) {
			countOrganizer++;
		}
	}
	if(countOrganizer > 1) {
		let err = '[ERROR]参加者テーブル > 幹事が複数存在';
		console.log(err);
		return [{'ERROR': err}];
	}
	if(countOrganizer < 1) {
		let err = '[ERROR]参加者テーブル > 幹事が存在しない';
		console.log(err);
		return [{'ERROR': err}];
	}

	/***************************************************/
	/* 1.参加者テーブル(attendTable)にランク情報を付加 */
	/***************************************************/
	// 参加者毎の役職ランク、採用コースランクを算出する
	// https://mseeeen.msen.jp/javascript-filter-function/
	for(let i = 0; i < attendTable.length; i++) {
		let attendRank = 0;
		// 役職ランクの抽出
		// ランクテーブルから参加者の役職に該当するものをfilterで抽出
		// 抽出された配列の最初の要素のランクを使用
		let arrRank1 = rankTable.filter(x => x.pos === attendTable[i].pos);
		// 入力された役職が存在しないときエラー
		if (arrRank1 === undefined || arrRank1.length == 0) {
			let err = '[ERROR]参加者テーブル > No.' + (i + 1) + ':役職が存在しない';
			console.log(err);
			return [{'ERROR': err}];
		}
		posRank = arrRank1[0].rank;
		// 採用コースランクの抽出
		// ランクテーブルから参加者の採用コースに該当するものをfilterで抽出
		// 抽出された配列の最初の要素のランクを使用
		let arrRank2 = courseTable.filter(x => x.course === attendTable[i].course);
		// 入力された採用コースが存在しないときエラー
		if (arrRank2 === undefined || arrRank2.length == 0) {
			let err = '[ERROR]参加者テーブル > No.' + (i + 1) + ':採用コースが存在しない';
			console.log(err);
			return [{'ERROR': err}];
		}
		courseRank = arrRank2[0].rank;
		// ランク合計値の算出
		// 役職ランクの採用コース補正がある場合のみ採用コースランクを加算
		if(arrRank1[0].cor) {
			attendRank = posRank + courseRank;
		} else {
			attendRank = posRank;
		}
		// 【参加者テーブル】合計ランク(totalRank)を追加
		attendTable[i].totalRank = attendRank;
		// filterは配列が抽出されるため、最後にdeleteで配列を初期化
		delete arrRank1;
		delete arrRank2;
	}

	/***********************************************/
	/* 2.ランクごとの倍率テーブル(rateTable)の作成 */
	/***********************************************/
	let rateTable = new Array();
	// 各ランクの参加者有無を判定し、1～参加有の最大ランク数分の配列(rate)を作成
	let rate = new Array();
	for(let i = 0; i < attendTable.length; i++) {
		rank = attendTable[i].totalRank;
		rate[rank] = 1;
	}

	// 配列(rate)をもとにランクごとの倍率テーブルを作成
	for(let i = 0; i < rate.length; i++) {
		if(rate[i] == 1){
			rateTable[i] = {
				attend: 1,	// 当該ランクの参加者有無
				rankValue: i, // 参加者有のランク値
				maxRate: 0,	// 初期化
				minRate: 0,	// 初期化
				rate: 0	// 初期化
			}
		} else {
			// 参加者無ランクの初期値設定
			rateTable[i] = {
				attend: 0,
				rankValue: 0,
				maxRate: 0,
				minRate: 0,
				rate: 0
			}
		}
	}

	// 最大倍数と最小倍数を初期化
	for(let i = 0; i < rateTable.length; i++) {
		rateTable[i].maxRate = 0;
		rateTable[i].minRate = 0;
	}
	// 参加者ランクをもとに、参加者のうち最大のランクに[最大倍率]を設定
	// 最大倍数を判定し、倍率に最大倍数値をセット
	let maxRateIndex;
	// 倍率テーブルを最後から検索し最初に0以外の値があったランクを最大倍数と判定
	for(let i = rateTable.length - 1; i >= 0; i--) {
		if(rateTable[i].rankValue != 0) {
			rateTable[i].maxRate = maxRate;
			rateTable[i].rate = rateTable[i].maxRate;
			maxRateIndex = i;
			break;
		}
	}
	// 参加者ランクをもとに、参加者のうち最小のランクに最小倍率として100%を設定
	// 最小倍数を判定し、倍率に100%をセット
	let minRateIndex;
	// 倍率テーブルを最初から検索し最初に0以外の値があったランクを最小倍数と判定
	for(let i = 0; i < rateTable.length; i++) {
		if(rateTable[i].rankValue != 0) {
			rateTable[i].minRate = 1;
			rateTable[i].rate = rateTable[i].minRate;
			minRateIndex = i;
			break;
		}
	}
	// 最大ランクと最小ランクの間に存在するランクの数を中間ランク数として算出
	let midRankCount = maxRateIndex - minRateIndex;
	// 中間ランク数をもとに最大ランクと最小ランクの間の役職に割り振る倍率加算値を算出
	let addRateValue = (maxRate - 1) / midRankCount;
	// ランク毎の支払額の倍率を算出してセット
	// 最小倍率からランクが大きくなるごとに倍率加算値を加算
	// 最小のランクの倍率100%から最大のランクの倍率まで倍率が均等になるように配分
	for(let i = minRateIndex + 1; i < maxRateIndex; i++) {
		rateTable[i].rate = rateTable[i-1].rate + addRateValue;
	}

	// (debug)倍率テーブル表示
	//console.log(rateTable);

	/****************************************/
	/* 3.参加者テーブルに倍率と支払率を付加 */
	/****************************************/
	let attendRate = 0.0000;
	// 倍率合計値
	let sumRate = 0;
	for(let i = 0; i < attendTable.length; i++) {
		if(attendTable[i].guest || attendTable[i].adjustFee > 0 || attendTable[i].totalRank == 0) {
			// ゲスト、調整金額有、ランク無のときは倍率0%
			attendRate = 0;
		} else {
			// ランクから倍率テーブルを参照して倍率を抽出
			let arrRank1 = rateTable.filter(x => x.rankValue == attendTable[i].totalRank);
			attendRate = Math.round(arrRank1[0].rate * 10000) / 10000;
		}
		// 【参加者テーブル】参加者ごとの倍率(rate)の設定
		attendTable[i].rate = attendRate;
		// 支払率を算出するための倍率合計値を計算
		sumRate = sumRate + attendRate;
		// filterで抽出すると配列が抽出されるため、最後にdeleteで配列を初期化
		delete arrRank1;
	}
	let attendPercentage = 0.0000;
	for(let i = 0; i < attendTable.length; i++) {
		if(sumRate != 0) {
			attendPercentage = Math.round(attendTable[i].rate / sumRate * 10000) / 10000;
		} else {
			attendPercentage = 0;
		}
		// 【参加者テーブル】参加者ごとの支払率(percentage)を設定
		attendTable[i].percentage = attendPercentage;
	}

	/***********************/
	/* 4.調整前金額1を算出 */
	/***********************/
	// 調整後支払総額を算出
	// 調整金額が入力されている参加者は会費金額＝調整金額となるため
	// 支払総額から調整金額を差し引いた金額をそれ以外の参加者で按分していく
	let adjustPayment = 0;
	for(let i = 0; i < attendTable.length; i++) {
		adjustPayment = adjustPayment + attendTable[i].adjustFee;
	}
	adjustPayment = payment - adjustPayment;
	// 調整金額の合計が支払総額より大きいときエラー
	if(adjustPayment < 0) {
		let err = '[ERROR]参加者テーブル > 支払総額より調整金額に入力された金額が大きい';
		console.log(err);
		return [{'ERROR': err}];
	}
	// 参加者ごとの調整前金額1を100円単位で算出
	let fee1 = 0;
	// 調整前金額1合計
	let sumFee1 = 0;
	for(let i = 0; i < attendTable.length; i++) {
		if(attendTable[i].adjustFee == 0) {
			// 調整金額が無い場合は調整後支払総額の支払率分を100円単位で設定
			fee1 = Math.round(adjustPayment * attendTable[i].percentage / 100) * 100;
		} else {
			// 調整金額がある場合は調整金額をそのまま設定
			fee1 = attendTable[i].adjustFee;
		}
		// 【参加者テーブル】調整前金額1(fee1)を設定
		attendTable[i].fee1 = fee1;
		sumFee1 = sumFee1 + fee1;
	}
	// 調整前金額1における端数の算出(未使用)
	let fracFee1 = payment - sumFee1;

	/*********************************************/
	/* 5.調整前金額2を算出し端数の配分対象を判定 */
	/*********************************************/
	let fee2 = 0;
	// 丸め単位(500円)
	let unit = 500;
	// 調整前金額2合計
	let sumFee2 = 0;
	// ゲスト人数(6.で使用)
	let sumGuest = 0;
	// 丸め対象人数(6.で使用)
	let sumRound = 0;
	// 調整金額有人数(6.で使用)
	let sumAdjust = 0;
	for(let i = 0; i < attendTable.length; i++) {
		// ゲスト人数をカウント
		if(attendTable[i].guest) {
			sumGuest++;
		}
		// 丸め対象人数をカウント
		if(attendTable[i].round) {
			sumRound++;
		}
		// 調整金額人数をカウント
		if(attendTable[i].adjustFee) {
			sumAdjust++;
		}
		// 調整金額2算出
		if(attendTable[i].adjustFee == 0) {
			if(attendTable[i].round) {
				// 丸め有の場合は調整前金額1を丸め単位(unit)で四捨五入
				// floor():切捨 ceil():切上 round():四捨五入
				fee2 = Math.round(attendTable[i].fee1 / unit) * unit;
			} else {
				// 丸め無の場合は調整前金額1をそのまま設定
				fee2 = attendTable[i].fee1;
			}
		} else {
			// 調整金額がある場合は調整金額をそのまま設定
			fee2 = attendTable[i].adjustFee;
		}
		// 【参加者テーブル】調整前金額2(fee2)を設定
		attendTable[i].fee2 = fee2;
		sumFee2 = sumFee2 + fee2;
		// これまでに発生した端数の配分対象者を判定
		// 【参加者テーブル】配分対象(alloc)を設定
		if(attendTable[i].guest ||
			attendTable[i].adjustFee > 0 ||
			attendTable[i].totalRank == 0 ||
			attendTable[i].round) {
			// ゲスト、調整金額有、ランク無、丸め有のときは配分対象外
			attendTable[i].alloc = false;
		} else {
			attendTable[i].alloc = true;
		}
	}
	// 調整前金額2における端数の算出
	let fracFee2 = payment - sumFee2;

	/***************************************/
	/* 6.配分金額を算出し調整前金額3を算出 */
	/***************************************/
	let fee3 = 0;
	// 調整前金額3合計
	let sumFee3 = 0;
	// これまでに発生した端数の配分金額を100円単位で算出
	let allocFee = Math.round(fracFee2 / (attendTable.length - sumAdjust - sumGuest - sumRound) / 100) * 100;
	for(let i = 0; i < attendTable.length; i++) {
		// 配分対象者に配分金額を設定
		// 【参加者テーブル】配分金額(allocFee)を設定
		if(attendTable[i].alloc) {
			attendTable[i].allocFee = allocFee;
		} else {
			attendTable[i].allocFee = 0;
		}
		// 端数を配分した調整前金額3を算出
		fee3 = attendTable[i].fee2 + attendTable[i].allocFee;
		// 【参加者テーブル】調整前金額3(fee3)を設定
		attendTable[i].fee3 = fee3;
		sumFee3 = sumFee3 + fee3;
	}
	// 調整前金額3における端数の算出
	let fracFee3 = payment - sumFee3;

	/**************************************/
	/* 7.端数を幹事に加算し会費金額を決定 */
	/**************************************/
	let fee4 = 0;
	// 会費金額合計
	let sumFee4 = 0;
	for(let i = 0; i < attendTable.length; i++) {
		if(attendTable[i].organizer) {
			// 幹事の調整前金額3に端数を加算して会費金額を設定
			fee4 = attendTable[i].fee3 + fracFee3;
		} else {
			// 幹事以外は調整前金額3をそのまま会費金額に設定
			fee4 = attendTable[i].fee3
		}
		// 【参加者テーブル】会費金額(fee4)を設定
		attendTable[i].fee4 = fee4;
		sumFee4 = sumFee4 + fee4;
	}
	// 検算処理：端数が残っている場合はエラー表示
	let fracFee4 = payment - sumFee4;
	if(fracFee4 != 0) {
		let err = '[ERROR]参加者テーブル > 会費金額合計と支払金額が不一致';
		console.log(err);
		return [{'ERROR': err}];
	} else {
		//console.log('[INFO]計算OK：会費金額合計と支払金額が一致');
	}

	/********************/
	/* 8.支払倍率を算出 */
	/********************/
	// 参加者テーブルを金額順にソート(降順)
	attendTable.sort((a, b) => {
		if(a.fee4 > b.fee4) return -1;
		if(a.fee4 < b.fee4) return 1;
		return 0;
	});
	// ソート結果の最初の要素を最大の会費金額とする
	let maxFee = attendTable[0].fee4;

	// 参加者テーブルを金額順にソート(昇順)
	attendTable.sort((a, b) => {
		if(a.fee4 < b.fee4) return -1;
		if(a.fee4 > b.fee4) return 1;
		return 0;
	});
	// ソート結果で会費金額が0以外の最初の要素を最小の会費金額とする
	let minFee = 0;
	for(let i = 0; i < attendTable.length; i++) {
		if(attendTable[i].fee4 > 0) {
			minFee = attendTable[i].fee4;
			break;
		}
	}

	// 参加者テーブルのソートをNo順に戻す
	attendTable.sort((a, b) => {
		if(a.no < b.no) return -1;
		if(a.no > b.no) return 1;
		return 0;
	});

	// 会費金額÷最小会費金額で支払倍率を算出
	for(let i = 0; i < attendTable.length; i++) {
		// 【参加者テーブル】支払倍率(feeRate)を設定
		attendTable[i].feeRate = Math.round(attendTable[i].fee4 / minFee * 100) / 100;
	}

	return attendTable;

	// (debug)参加者テーブル表示
	//console.log(attendTable);

}
