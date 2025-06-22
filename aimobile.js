

// // Selecting HTML elements
// const input = document.querySelector("input");
// const guessMessage = document.getElementById("guess-message");
// const checkButton = document.querySelector("button");
// const remainChance = document.querySelector(".chance-count");

// // Focus on the input field when the page loads
// input.focus();

// // Generate a random number between 1 and 100
// let randomNum = Math.floor(Math.random() * 100) + 1;
// console.log(randomNum);

// // Initialize the number of chances
// let chance = 10;

// // Add event listener to the check button
// checkButton.addEventListener("click", () => {
//     chance--;

//     // Get the value from the input field and convert it to a number
//     let inputValue = parseInt(input.value, 10);

//     // Clear the input field
//     input.value = "";

//     // Show the guess message
//     guessMessage.style.display = "block";

//     // Check if the input value matches the random number
//     if (inputValue === randomNum) {
//         guessMessage.textContent = "Congratulations!";
//         checkButton.disabled = true;
//         checkButton.textContent = "Replay";
//         guessMessage.style.color = "#333";
//     } else if (inputValue > randomNum && inputValue <= 100) {
//         guessMessage.textContent = "Your guess is high";
//         remainChance.textContent = chance;
//         guessMessage.style.color = "#333";
//     } else if (inputValue < randomNum && inputValue >= 1) {
//         guessMessage.textContent = "Your guess is low";
//         remainChance.textContent = chance;
//         guessMessage.style.color = "#333";
//     } else {
//         guessMessage.textContent = "Your number is invalid";
//         guessMessage.style.color = "gray";
//     }

//     // Check if the player has run out of chances
//     if (chance === 0) {
//         guessMessage.textContent = "You lost the game";
//         checkButton.textContent = "Replay";
//         checkButton.disabled = true;
//     }

//     // Reload the page if the player has less than 0 chances (should not happen)
//     if (chance < 0) {
//         window.location.reload();
//     }
// });

// انتظر تحميل محتوى الصفحة بالكامل قبل تشغيل المنطق
document.addEventListener('DOMContentLoaded', () => {
    // عناصر واجهة المستخدم
    const guessInput = document.querySelector('input[type="number"]');
    const checkBtn   = document.querySelector('button');           // زر التحقق
    const restartBtn = document.querySelector('input[type="reset"]'); // زر إعادة التشغيل
    const messageEl  = document.getElementById('guess-message');   // عنصر الرسالة
    const chanceEl   = document.querySelector('.chance-count');    // عداد الفرص المتبقية
  
    let secretNumber = generateSecret(); // الرقم السري العشوائي
    let attemptsLeft = 10;               // عدد المحاولات المتاحة
  
    /**
     * توليد رقم عشوائي بين 1 و 100
     */
    function generateSecret() {
      return Math.floor(Math.random() * 100) + 1;
    }
  
    /**
     * إعادة تعيين اللعبة بالكامل
     */
    function resetGame() {
      secretNumber = generateSecret();
      attemptsLeft = 10;
      chanceEl.textContent = attemptsLeft;
      guessInput.value = '';
      guessInput.disabled = false;
      checkBtn.disabled = false;
      hideMessage();
      guessInput.focus();
    }
  
    /**
     * إظهار رسالة للمستخدم
     * @param {string} text نص الرسالة
     * @param {string} [status] "success" أو "fail" لتلوين الرسالة عند الفوز أو الخسارة
     */
    function showMessage(text, status) {
      messageEl.textContent = text;
      messageEl.style.display = 'block';
      if (status === 'success') {
        messageEl.style.color = 'green';
      } else if (status === 'fail') {
        messageEl.style.color = 'red';
      } else {
        messageEl.style.color = 'black';
      }
    }
  
    /**
     * إخفاء رسالة التخمين
     */
    function hideMessage() {
      messageEl.style.display = 'none';
    }
  
    /**
     * إنهاء اللعبة عند الفوز أو استنفاد المحاولات
     */
    function endGame() {
      guessInput.disabled = true;
      checkBtn.disabled = true;
    }
  
    // حدث الضغط على زر التحقق
    checkBtn.addEventListener('click', () => {
      const guess = Number(guessInput.value);
  
      // التحقق من صحة الإدخال
      if (!guess || guess < 1 || guess > 100) {
        showMessage('برجاء إدخال رقم صحيح بين 1 و 100');
        return;
      }
  
      // مطابقة التخمين مع الرقم السري
      if (guess === secretNumber) {
        showMessage(`مبروك! لقد خمنت الرقم الصحيح (${secretNumber})`, 'success');
        endGame();
        return;
      }
  
      // في حالة التخمين الخاطئ
      attemptsLeft--;
      chanceEl.textContent = attemptsLeft;
  
      if (attemptsLeft === 0) {
        showMessage(`انتهت المحاولات! لقد خسرت اللعبة. الرقم الصحيح هو ${secretNumber}.`, 'fail');
        endGame();
      } else {
        // تقديم تلميح للاعب لزيادة المتعة
        const hint = guess < secretNumber ? 'أكبر ⬆️' : 'أصغر ⬇️';
        showMessage(`خطأ! حاول رقم ${hint}`);
      }
  
      // تنظيف حقل الإدخال للمتابعة
      guessInput.value = '';
      guessInput.focus();
    });
  
    // حدث الضغط على زر إعادة التشغيل
    restartBtn.addEventListener('click', (e) => {
      // منع وظيفة reset الافتراضية للعنصر إن وُجد نموذج
      if (e) e.preventDefault();
      resetGame();
    });
  
    // تهيئة الرسالة وعداد الفرص عند بدء اللعبة
    hideMessage();
    chanceEl.textContent = attemptsLeft;
  });
  