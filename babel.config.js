//babel7的配置
module.exports={
    presets: [
        [
            "env",
            {
                "modules": false
            }
        ]
    ],
    plugins: [
        ['import', {
          libraryName: 'vant',
          libraryDirectory: 'es',
          style: true
        }, 'vant']
      ]
}