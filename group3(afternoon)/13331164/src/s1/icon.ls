class Button
    @buttons = []
    @disable-all-other-buttons = (this_button)!-> [button.disable! for button in @buttons when button isnt this_button and button.state isnt 'finish']
    @enable-all-other-buttons = (this_button)!-> [button.enable! for button in @buttons when button isnt this_button and button.state isnt 'finish']
    @all-button-is-finish = ->
        [return false for button in @buttons when button.state isnt 'finish']
        true
    @reset-all = !-> [button.reset! for button in @buttons]

    (@dom, @number-fetched-callback)->
        @state = 'enabled'
        @dom.add-class 'enabled'
        @dom.click !~> if @state is 'enabled'
            @@@disable-all-other-buttons @
            @wait!
            @fetch-number-and-show!
        @@@buttons.push @

    fetch-number-and-show: !-> $.get '/',(number, result)!~>
        @finish!
        @@@all-number-fetched-callback! if @@@all-button-is-finish!
        @@@enable-all-other-buttons @
        @show-number number
        @number-fetched-callback number

    show-number: (number) !-> @dom.find '.number' .text number

    disable: !-> @state = 'disabled' ; @dom.remove-class 'enabled' .add-class 'disabled'
    enable: !-> @state = 'enabled' ; @dom.remove-class 'disabled' .add-class 'enabled'
    wait: !-> @state = 'waiting' ; @dom.remove-class 'enabled' .add-class 'waiting'; @dom.find '.number' .remove-class 'nodisplay' .add-class 'display'
    finish: !-> @state = 'finish' ; @dom.remove-class 'waiting' .add-class 'finish'

    reset: !->
        @state = 'enabled'; @dom.remove-class 'disabled waiting finish' .add-class 'enabled'
        @dom.find '.number' .text '...'
        @dom.find '.number' .remove-class 'display' .add-class 'nodisplay'


click-and-calculate-the-sum-to-the-bubble = ->
  bubble = $ '#info-bar'
  bubble.add-class 'disabled'
  Button.all-number-fetched-callback = !-> bubble.remove-class 'disabled' .add-class 'enabled'
  bubble.click !-> if bubble.has-class 'enabled'
    bubble.find '.sum' .text bubble_result.sum
    bubble.remove-class 'enabled'

bubble_result =
  sum: 0
  add: (number)-> @sum += parse-int number
  reset: !-> @sum = 0


reset-all-when-leave-button = !->
  $ '#bottom-positioner' .on 'mouseleave' !->
    set-timeout !-> 
      reset!
    , 0

reset = !->
  Button.reset-all!
  bubble = $ '#info-bar'
  bubble.remove-class 'enabled' .add-class 'disabled'
  bubble_result.reset!
  bubble.find '.sum' .text ''


$ ->
    click-and-fetch-numbers-to-all-buttons!
    click-and-calculate-the-sum-to-the-bubble!
    reset-all-when-leave-button!




click-and-fetch-numbers-to-all-buttons = !->
    good-messages = ['A', 'B', 'C', 'D', 'E']
    bad-messages = ['a', 'b', 'c', 'd', 'e']
    for let dom, i in $ '#control-ring-container .button'
        button = new Button ($ dom), (number)!->
            bubble_result.add number
            




