# hat-tip to Liam Baum and Andrew Healey, a British software engineer, who have both implemented Markov Chains in ways that proved invaluable to our group!
# You can find Liam's (super awesome) lyric generator here on his repo: https://github.com/hunter-teacher-cert/work_csci70900-mrbombmusic/tree/master/ds/markov
# And Healey Codes version here: https://github.com/healeycodes/markov-chain-generator

import random

# This function handles input by opening a file and returning it as a string
def input(text):
    with open(text) as f:
        corpus = f.read()
    return corpus

# This function takes as inputs your corpus (a string of text) and the state size and returns a dictionary that is a Markov model of the corpus

    # Here, state size is another way of saying the "n" in "n-gram":

        # If state size is 1, the model will build a dictionary in which each word in the corpus
        # is a key, and the words that follows a given word--anywhere in the corpus--are the values.

        # If state size is 2, the model will build a dictionary in which each pair of words in the corpus
        # is a key, and the words that follows that pair are the keys.

def build_markov(corpus, state_size):
    corpus = corpus.split()#split the string input into a list of words
    markov = {}#create an empty dictionary to hold the model - keys and values are words
    for i in range(state_size, len(corpus)):
        current_word = corpus[i]
        previous_words = ' '.join(corpus[i-state_size:i])
        if previous_words in markov:
            markov[previous_words].append(current_word)
        else:
            markov[previous_words] = [current_word]
    return markov


# This function takes as input a Markov model (in the form of a dictionary), the state size, and the maximum number of words you want to generate.
# It returns a string that (hopefully) sounds like the text input into the model!
def generate_text(model, state_size, max_length):

    # This function picks a new starting word or phrase, by picking a random capitalized word
    # Obviously, this assumes that lines start with capital letters, which is not always the case
    def get_new_starter():
        return random.choice([s.split(' ') for s in model.keys() if s[0].isupper()])
    text = get_new_starter()

    i = state_size
    while True:
        key = ' '.join(text[i-state_size:i])
        if key not in model:
            text += get_new_starter()
            i += 1
            continue

        next_word = random.choice(model[key])
        text.append(next_word)
        i += 1
        if i == max_length:
            break
    return ' '.join(text)

# This is like "main" in java - here is where we run the program by calling the functions
if __name__ == "__main__":

    # body = input('lyrics/drake.txt')
    # print(body)
    # model = build_markov(body,2)
    # print(model)
    # print(generate_text(model,2,100))
    
    # body = input('lyrics/beatles.txt')
    # print(body)
    # model = build_markov(body,2)
    # print(model)
    # print(generate_text(model,2,100))
    
    # body = input('lyrics/adele.txt')
    # print(body)
    # model = build_markov(body,2)
    # print(model)
    # print(generate_text(model,2,100))

    body = input('lyrics/dr-seuss.txt')
    # print(body)
    model = build_markov(body,2)
    # print(model)
    print(generate_text(model,2,100))