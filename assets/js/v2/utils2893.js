(() => {
  const $http = (function () {
    const csrf_token = document.querySelector('meta[name="csrf-token"]').content
    const http_instance = axios.create()
    http_instance.defaults.headers.common['X-CSRF-Token'] = csrf_token
    http_instance.defaults.timeout = 60000
    return http_instance
  })()

  const build_query_ = (params) => {
    let params_list = []
      for (item in params) {
        params_list.push(item + '=' + params[item])
      }

      return params_list.join('&')
  }
  
  const utils = {
    get_endpoint: function (endpoint, params = null) {
      let uri = BASE_URL + '/requests/ajax' + endpoint
      uri += params ? ('?' + build_query_(params)) : ''
      return uri
    },
  
    api_endpoint: function (endpoint, params = null) {
      let uri = BASE_URL + '/api/v1' + endpoint
      uri += params ? ('?' + build_query_(params)) : ''
      return uri
    }
  }
  
  const Notify = (function () {
  
    let notify_settings = {
      titleSize: '1rem',
      progressBar: false,
      position: 'topCenter',
      overlay: true,
      timeout: 0,
      close: false,
    }
  
    return {
      error: function (title, text, onclose) {
        Swal.fire({
          icon: 'error',
          titleText: title,
          confirmButtonColor: '#ab2923',
          confirmButtonText: 'Okay',
          text
        })
          .then(() => {
            if (onclose) {
            onclose()
          }
        })
      },
    
      success: function (title, text, onclose = null) {
        Swal.fire({
          icon: 'success',
          titleText: title,
          confirmButtonColor: '#ab2923',
          confirmButtonText: 'Okay',
          text
        })
          .then(() => {
            if (onclose) {
            onclose()
          }
        })
      },
    
      warning: function (title, text, onclose = null) {
        Swal.fire({
          icon: 'warning',
          titleText: title,
          confirmButtonColor: '#ab2923',
          confirmButtonText: 'Okay',
          text
        })
          .then(() => {
            if (onclose) {
            onclose()
          }
        })
      },
  
      confirm: function ({title, text, confirmText = 'OK', onConfirm = null, onCancel = null}) {
        Swal.fire({
          allowOutsideClick: false,
          titleText: title,
          text,
          confirmButtonText: confirmText,
          confirmButtonColor: '#16a34a',
          cancelButtonColor: '#dc2626',
          showCancelButton: true
        })
          .then(result => {
          if (result.isConfirmed && onConfirm) {
            onConfirm()
          }  
          
            if (result.isDismissed && onCancel) {
              onCancel()
            }
        })
      },
      
      connectionError: function (titleText = 'An error occured', text = 'Unable to complete request') {
        Swal.fire({
          icon: 'error',
          titleText,
          confirmButtonColor: '#ab2923',
          confirmButtonText: 'Okay',
          text
        })
          .then(() => {
            if (onclose) {
            onclose()
          }
        })
      }
    }
  })()

  window.$http = $http
  window.Notify = Notify
  window.utils = utils

})()