import template from './contactForm.html!text';
import Ractive from 'ractive';

var ContactForm = Ractive.extend({
  template: template,
  oninit: function() {
    var self = this;
    self.set('isVisible', false);
    self.on({
      'showForm': function(event) {
        self.toggle('isVisible');
        self.set({
          name: '',
          email: '',
          phoneNumber: '',
          url: '',
          success: false,
          class: '',
          registrationFailed: false,
          userHasWebsite: false
        })
        event.original.preventDefault();
      },

      'submitForm': function(event) {
        var name = self.nodes.userName.value;
        var email = self.nodes.userEmail.value;
        if (name == '' || email == '') {
          self.set({
            registrationFailed: true,
            class: 'empty-form'
          });
        }
        else {
          self.set({
            success: true,
            registrationFailed: false,
            class: 'filled-form'
          });
          var user = {
            name: this.get('name'),
            email: this.get('email'),
            phoneNumber: this.get('phoneNumber'),
            url: this.get('url')
          };
          // you can add this user to database for example
          console.log(user);
        };
        event.original.preventDefault();
      },

      'websiteExists': function() {
        self.toggle('userHasWebsite');
        self.set('url', '');
      }
    });
  }
})

Ractive.components.contactform = ContactForm;
