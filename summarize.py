# importing libraries
import nltk

#nltk.download('all')

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize

while 1:
        # Input text - to summarize
        f = open("input.txt", encoding="utf8")
        text = f.read()
        f.close()

        if len(text) > 5:
                f = open("input.txt", "w")
                blank = '0'
                f.write(blank)
                f.close()

                # Tokenizing the text
                stopWords = set(stopwords.words("english"))
                words = word_tokenize(text)

                # Creating a frequency table to keep the
                # score of each word

                freqTable = dict()
                for word in words:
                        word = word.lower()
                        if word in stopWords:
                                continue
                        if word in freqTable:
                                freqTable[word] += 1
                        else:
                                freqTable[word] = 1

                # Creating a dictionary to keep the score
                # of each sentence
                sentences = sent_tokenize(text)
                sentenceValue = dict()

                for sentence in sentences:
                        for word, freq in freqTable.items():
                                if word in sentence.lower():
                                        if sentence in sentenceValue:
                                                sentenceValue[sentence] += freq
                                        else:
                                                sentenceValue[sentence] = freq



                sumValues = 0
                for sentence in sentenceValue:
                        sumValues += sentenceValue[sentence]

                # Average value of a sentence from the original text

                average = int(sumValues / len(sentenceValue))

                # Storing sentences into our summary.
                summary = ''
                for sentence in sentences:
                        if (sentence in sentenceValue) and (sentenceValue[sentence] > (1.2 * average)):
                                summary += " " + sentence
                #print(summary)
                f = open("output.txt", "w")
                f.write(summary)
                f.close()
